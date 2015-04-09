(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$q', 'logger'];
    /* @ngInject */
    function dataService($q, logger) {
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
                name: 'Project Aardvark',
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

        function getProjects() {
            projectCounts.red = 13;
            projectCounts.yellow = 56;
            projectCounts.green = 156;

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
