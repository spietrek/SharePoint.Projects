/*global _*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$q', 'logger', 'lodash'];
    /* @ngInject */
    function dataService($q, logger, lodash) {
        var service = {
            getProjects: getProjects,
            getRedProjectsCount: getRedProjectsCount,
            getYellowProjectsCount: getYellowProjectsCount,
            getGreenProjectsCount: getGreenProjectsCount
        };

        var projectCounts = {
            red: 0,
            yellow: 0,
            green: 0
        };

        var projects = [
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
        ];

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
            projectCounts.red = getProjectCount(projects, 'R');
            projectCounts.yellow = getProjectCount(projects, 'Y');
            projectCounts.green = getProjectCount(projects, 'G');

            return $q.when(projects)
                .then(success)
                .catch(fail);

            function success(response) {
                return response;
            }

            function fail(error) {
                var msg = 'query for projects failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
    }
})();
