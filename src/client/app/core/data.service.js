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
        var query = {
            baseRestUrl: spPageService.getInfo().restUrl,
            type: 'lists',
            method: 'getbytitle(\'Projects\')/items',
            select1: '$select=Title,OverallStatus,BudgetStatus,ResourceStatus,',
            select2: 'ScheduleStatus,ProjectManager',
            url: function () {
                return this.baseRestUrl + '/' + this.type + '/' + this.method +
                    '?' + this.select1 + this.select2;
            }
        };

        var projectCounts = {
            red: 0,
            yellow: 0,
            green: 0
        };

        var service = {
            getProjects: getProjects,
            getRedProjectsCount: getRedProjectsCount,
            getYellowProjectsCount: getYellowProjectsCount,
            getGreenProjectsCount: getGreenProjectsCount
        };

        return service;

        function getRedProjectsCount() {
            return $q.when(projectCounts.red);
        }

        function getYellowProjectsCount() {
            return $q.when(projectCounts.yellow);
        }

        function getGreenProjectsCount() {
            return $q.when(projectCounts.green);
        }

        function getProjectCount(projects, status) {
            var items = lodash.filter(projects, function (item) {
                return item.overallStatus === status;
            });
            return items.length;
        }

        function getProjects() {
            projects = [];
            var req = {
                method: 'GET',
                url: query.url(),
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            };

            return $http(req)
                .then(success)
                .catch(fail);

            function success(response) {
                var items = response.data.d['results'];
                angular.forEach(items, function (item) {
                    var values = {
                        id: item['ID'],
                        name: item['Title'],
                        overallStatus: item['OverallStatus'],
                        budgetStatus: item['BudgetStatus'],
                        resourceStatus: item['ResourceStatus'],
                        scheduleStatus: item['ScheduleStatus'],
                        projectManager: item['ProjectManager']
                    };
                    projects.push(values);
                });

                projectCounts.red = getProjectCount(projects, 'R');
                projectCounts.yellow = getProjectCount(projects, 'Y');
                projectCounts.green = getProjectCount(projects, 'G');
                return projects;
            }

            function fail(error) {
                var msg = 'query for projects failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
    }
})();
