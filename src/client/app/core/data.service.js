/*global _spPageContextInfo*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'logger', 'lodash', 'spPageService'];
    /* @ngInject */
    function dataService($http, $q, logger, lodash, spPageService) {
        var projectData = {
                projects: [],
                redCounts: 0,
                yellowCounts: 0,
                greenCounts: 0
            },
            overrideDataLoad = false;

        function getProject(id) {
            var project = lodash.find(projectData.projects, function (item) {
                return item.id.toString() === id;
            });

            project = angular.isDefined(project) ? project : {};
            return $q.when(project);
        }

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
                ProjectManager: model.projectManager
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

            function success(response) {
                overrideDataLoad = true;
                return $q.when(response);
            }

            function fail(error) {
                var msg = 'Query for creating project failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getProjectsUsingHttp() {
            var restQuery = {
                baseRestUrl: spPageService.getInfo().restUrl,
                type: 'lists',
                method: 'getbytitle(\'Projects\')/items',
                select1: '$select=ID,Title,OverallStatus,BudgetStatus,ResourceStatus,',
                select2: 'ScheduleStatus,ProjectManager',
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
                        projectManager: item['ProjectManager']
                    };
                    allProjects.push(data);
                    projectData.projects.push(data);
                });

                projectData.redCounts = getProjectCount(allProjects, 'R');
                projectData.yellowCounts = getProjectCount(allProjects, 'Y');
                projectData.greenCounts = getProjectCount(allProjects, 'G');
                overrideDataLoad = false;
                return projectData.projects;
            }

            function fail(error) {
                var msg = 'Query for projects failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getProjectItems(projects, state) {
            var items = lodash.filter(projects, function (item) {
                return item.overallStatus === state;
            });
            return $q.when(items);
        }

        function isDataLoadRequired() {
            return (projectData.projects.length > 0) || (overrideDataLoad === true);
        }

        function getRedProjects() {
            return isDataLoadRequired() ? getProjectItems(projectData.projects, 'R') :
                getProjectsUsingHttp().then(function (data) {
                    return getRedProjects(data);
                });
        }

        function getYellowProjects() {
            return isDataLoadRequired() ? getProjectItems(projectData.projects, 'Y') :
                getProjectsUsingHttp().then(function (data) {
                    return getYellowProjects(data);
                });
        }

        function getGreenProjects() {
            return isDataLoadRequired() ? getProjectItems(projectData.projects, 'G') :
                getProjectsUsingHttp().then(function (data) {
                    return getYellowProjects(data);
                });
        }

        function getProjects() {
            return isDataLoadRequired() ? $q.when(projectData.projects) :
                getProjectsUsingHttp();
        }

        return {
            getProjects: getProjects,
            getRedProjects: getRedProjects,
            getYellowProjects: getYellowProjects,
            getGreenProjects: getGreenProjects,
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
            saveProject: saveProject
        };
    }
})();
