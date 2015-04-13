/*global _*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'logger', 'lodash'];
    /* @ngInject */
    function dataService($http, $q, logger, lodash) {
        var service = {
            getProjects: getProjects,
            getRedProjectsCount: getRedProjectsCount,
            getYellowProjectsCount: getYellowProjectsCount,
            getGreenProjectsCount: getGreenProjectsCount
        };

        var query = {
            baseRestUrl: 'https://cardinalsolutionsrtp.sharepoint.com/sites/projects/_api',
            type: 'lists',
            method: 'getbytitle(\'Projects\')/items',
            listName: 'Projects',
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

        var projects = [];

        /*var projects = [
         {
         id: 1,
         name: 'Project Minnesota',
         overallStatus: 'G',
         budgetStatus: 'G',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 2,
         name: 'Project Basketball',
         overallStatus: 'Y',
         budgetStatus: 'Y',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Laura Pietrek'
         },
         {
         id: 3,
         name: 'Project Omega',
         overallStatus: 'R',
         budgetStatus: 'Y',
         resourceStatus: 'R',
         scheduleStatus: 'R',
         projectManager: 'John Matthews'
         },
         {
         id: 4,
         name: 'Project Capstone',
         overallStatus: 'Y',
         budgetStatus: 'G',
         resourceStatus: 'Y',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 5,
         name: 'Project Beta',
         overallStatus: 'R',
         budgetStatus: 'R',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'John Matthews'
         },
         {
         id: 6,
         name: 'Project Open',
         overallStatus: 'G',
         budgetStatus: 'G',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 7,
         name: 'Project Vegas',
         overallStatus: 'Y',
         budgetStatus: 'Y',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Laura Pietrek'
         },
         {
         id: 8,
         name: 'Project Zion',
         overallStatus: 'R',
         budgetStatus: 'Y',
         resourceStatus: 'R',
         scheduleStatus: 'R',
         projectManager: 'John Matthews'
         },
         {
         id: 9,
         name: 'Project Jordan',
         overallStatus: 'Y',
         budgetStatus: 'G',
         resourceStatus: 'Y',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 10,
         name: 'Project Football',
         overallStatus: 'R',
         budgetStatus: 'R',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'John Matthews'
         },
         {
         id: 11,
         name: 'Project Arkansas',
         overallStatus: 'G',
         budgetStatus: 'G',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 12,
         name: 'Project Opus',
         overallStatus: 'Y',
         budgetStatus: 'Y',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Laura Pietrek'
         },
         {
         id: 13,
         name: 'Project Castle',
         overallStatus: 'R',
         budgetStatus: 'Y',
         resourceStatus: 'R',
         scheduleStatus: 'R',
         projectManager: 'John Matthews'
         },
         {
         id: 14,
         name: 'Project Moon',
         overallStatus: 'Y',
         budgetStatus: 'G',
         resourceStatus: 'Y',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 15,
         name: 'Project Surface',
         overallStatus: 'R',
         budgetStatus: 'R',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'John Matthews'
         },
         {
         id: 16,
         name: 'Project Neptune',
         overallStatus: 'G',
         budgetStatus: 'G',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 17,
         name: 'Project Venus',
         overallStatus: 'Y',
         budgetStatus: 'Y',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'Laura Pietrek'
         },
         {
         id: 18,
         name: 'Project Mercury',
         overallStatus: 'R',
         budgetStatus: 'Y',
         resourceStatus: 'R',
         scheduleStatus: 'R',
         projectManager: 'John Matthews'
         },
         {
         id: 19,
         name: 'Project Lite',
         overallStatus: 'Y',
         budgetStatus: 'G',
         resourceStatus: 'Y',
         scheduleStatus: 'G',
         projectManager: 'Steve Hart'
         },
         {
         id: 20,
         name: 'Project Georgia',
         overallStatus: 'R',
         budgetStatus: 'R',
         resourceStatus: 'G',
         scheduleStatus: 'G',
         projectManager: 'John Matthews'
         }
         ];*/

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
