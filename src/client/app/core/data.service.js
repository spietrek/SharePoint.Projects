(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'logger', 'lodash', 'spPageService', 'moment', '$state'];

  function dataService($http, $q, logger, lodash, spPageService, moment, $state) {
    var projectData = {
      projects: [],
      redCounts: 0,
      yellowCounts: 0,
      greenCounts: 0
    };

    function getProjectCount(projects, status) {
      var items = lodash.filter(projects, function (item) {
        return item.overallStatus === status;
      });
      return items.length;
    }

    function convertModel(model) {
      return {
        Title: model.name,
        OverallStatus: model.overallStatus,
        BudgetStatus: model.budgetStatus,
        ResourceStatus: model.resourceStatus,
        ScheduleStatus: model.scheduleStatus,
        ProjectManager: model.projectManager,
        PlannedEndDate: model.plannedEndDate,
        Notes: model.notes,
        Risks: JSON.stringify(model.risks)
      };
    }

    function saveProject(model) {
      var listDataSvcQuery = {
        baseListDataSvcUrl: spPageService.getInfo().listDataSvcUrl,
        listName: 'Projects',
        url: function () {
          return this.baseListDataSvcUrl + '/' + this.listName;
        }
      };

      var createRequest = {
        method: 'POST',
        processData: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(convertModel(model)),
        dataType: 'json',
        url: listDataSvcQuery.url()
      };

      var updateRequest = {
        method: 'POST',
        processData: false,
        contentType: 'application/json;odata=verbose',
        data: JSON.stringify(convertModel(model)),
        dataType: 'json',
        url: listDataSvcQuery.url() + '(' + model.id + ')',
        headers: {
          'If-Match': '*',
          'X-HTTP-Method': 'MERGE'
        }
      };

      return $http(model.id ? updateRequest : createRequest)
        .then(success)
        .catch(fail);

      function success() {
        return getProjectsUsingHttp();
      }

      function fail(error) {
        var msg = 'Query for creating project failed. ' + error.data.description;
        logger.error(msg);
        return $q.reject(msg);
      }
    }

    function getProjectsUsingHttp() {
      projectData.projects = [];
      var restQuery = {
        baseRestUrl: spPageService.getInfo().restUrl,
        type: 'lists',
        method: 'getbytitle(\'Projects\')/items',
        select1: '$select=ID,Title,OverallStatus,BudgetStatus,ResourceStatus,',
        select2: 'ScheduleStatus,ProjectManager,PlannedEndDate,Risks,Notes',
        url: function () {
          return this.baseRestUrl + '/' + this.type + '/' + this.method +
            '?' + this.select1 + this.select2 + '&$top=1000';
        }
      };

      var req = {
        method: 'GET',
        url: restQuery.url(),
        headers: {
          'Accept': 'application/json;odata=verbose'
        }
      };

      return $http(req)
        .then(success)
        .catch(fail);

      function success(response) {
        var items = response.data.d['results'],
          allProjects = [];
        angular.forEach(items, function (item) {
          var data = {
            id: item['ID'],
            name: item['Title'],
            overallStatus: item['OverallStatus'],
            budgetStatus: item['BudgetStatus'],
            resourceStatus: item['ResourceStatus'],
            scheduleStatus: item['ScheduleStatus'],
            projectManager: item['ProjectManager'],
            plannedEndDate: moment(item['PlannedEndDate']).toDate(),
            notes: item['Notes'],
            risks: JSON.parse(item['Risks']) === null ? [''] : JSON.parse(item['Risks'])
          };
          data.risksCount = getRisksCount(data.risks);
          allProjects.push(data);
          projectData.projects.push(data);
        });

        projectData.redCounts = getProjectCount(allProjects, 'R');
        projectData.yellowCounts = getProjectCount(allProjects, 'Y');
        projectData.greenCounts = getProjectCount(allProjects, 'G');
        return projectData.projects;
      }

      function fail(error) {
        var msg = 'Query for projects failed. ' + error.data.description;
        logger.error(msg);
        return $q.reject(msg);
      }
    }

    function getRisksCount(risks) {
      var count = 0;
      angular.forEach(risks, function (risk) {
        if (risk !== '') {
          count++;
        }
      });
      return count;
    }

    function getProjectItems(projects, filter) {
      if (filter === 'A') {
        return $q.when(projectData.projects);
      } else {
        var items = lodash.filter(projects, function (item) {
          return item.overallStatus === filter;
        });
        return $q.when(items);
      }
    }

    function isDataLoadNotRequired() {
      return (projectData.projects.length > 0);
    }

    function getRedProjects() {
      return isDataLoadNotRequired() ? getProjectItems(projectData.projects, 'R') :
        getProjectsUsingHttp().then(function (data) {
          return getRedProjects(data);
        });
    }

    function getYellowProjects() {
      return isDataLoadNotRequired() ? getProjectItems(projectData.projects, 'Y') :
        getProjectsUsingHttp().then(function (data) {
          return getYellowProjects(data);
        });
    }

    function getGreenProjects() {
      return isDataLoadNotRequired() ? getProjectItems(projectData.projects, 'G') :
        getProjectsUsingHttp().then(function (data) {
          return getGreenProjects(data);
        });
    }

    function getProjects() {
      var status = $state.current.name;
      var filter = 'A';
      if (status === 'green') {
        filter = 'G';
      } else if (status === 'yellow') {
        filter = 'Y';
      } else if (status === 'red') {
        filter = 'R';
      }

      return isDataLoadNotRequired() ? getProjectItems(projectData.projects, filter) :
        getProjectsUsingHttp().then(function (data) {
          return getProjects(status);
        });
    }

    function getTitle() {
      var status = $state.current.name;
      var title = 'All Projects';
      if (status === 'green') {
        title = 'Green Projects';
      } else if (status === 'yellow') {
        title = 'Yellow Projects';
      } else if (status === 'red') {
        title = 'Red Projects';
      }
      return title;
    }

    function getProject(id) {
      var project = lodash.find(projectData.projects, function (item) {
        return item.id.toString() === id;
      });

      project = angular.isDefined(project) ? project : null;
      return $q.when(project);
    }

    return {
      getProjects: getProjects,
      getProject: getProject,
      getRedProjectsCount: function () {
        return projectData.redCounts;
      },
      getYellowProjectsCount: function () {
        return projectData.yellowCounts;
      },
      getGreenProjectsCount: function () {
        return projectData.greenCounts;
      },
      getTotalProjectsCount: function () {
        return projectData.greenCounts + projectData.yellowCounts + projectData.redCounts;
      },
      saveProject: saveProject,
      getTitle: getTitle
    };
  }
})();
