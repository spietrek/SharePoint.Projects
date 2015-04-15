/*global _spPageContextInfo*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'logger', 'lodash', 'spPageService'];
    /* @ngInject */
    function dataService($http, $q, logger, lodash, spPageService) {
        var projects = [];
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

        var listDataSvcQuery = {
            baseListDataSvcUrl: spPageService.getInfo().listDataSvcUrl,
            listName: 'Projects',
            url: function () {
                return this.baseListDataSvcUrl + '/' + this.listName;
            }
        };

        var projectData = {
            projects: [],
            redCounts: 0,
            yellowCounts: 0,
            greenCounts: 0
        };

        function getProject(id) {
            var project = lodash.find(projects, function (item) {
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
                return $q.when(response);
            }

            function fail(error) {
                var msg = 'query for creating project failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getProjects(state) {
            projects = [];
            var req = {
                method: 'GET',
                url: restQuery.url(state),
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            };

            return $http(req)
                .then(success)
                .catch(fail);

            function isValidProject(state, data) {
                if (state === 'projects') {
                    return true;
                } else if (state === 'red') {
                    return data.overallStatus === 'R';
                } else if (state === 'yellow') {
                    return data.overallStatus === 'Y';
                } else if (state === 'green') {
                    return data.overallStatus === 'G';
                }
            }

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
                    if (isValidProject(state, data)) {
                        projects.push(data);
                    }
                });

                projectData.redCounts = getProjectCount(allProjects, 'R');
                projectData.yellowCounts = getProjectCount(allProjects, 'Y');
                projectData.greenCounts = getProjectCount(allProjects, 'G');
                projectData.projects = projects;
                return projects;
            }

            function fail(error) {
                var msg = 'query for projects failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
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
            saveProject: saveProject
        };
    }
})();
