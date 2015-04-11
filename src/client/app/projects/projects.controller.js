(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$q', 'dataService', 'logger'];
    /* @ngInject */
    function ProjectsController($q, dataService, logger) {
        var vm = this;
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
        vm.title = 'Projects';
        vm.searchText = '';
        vm.resource = {};

        activate();

        function activate() {
            var promises = [getProjects(), getRedProjectsCount(),
                getYellowProjectsCount(), getGreenProjectsCount()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
            });
        }

        function getRedProjectsCount() {
            return dataService.getRedProjectsCount().then(function (data) {
                vm.redProjectsCount = data;
                return vm.redProjectsCount;
            });
        }

        function getYellowProjectsCount() {
            return dataService.getYellowProjectsCount().then(function (data) {
                vm.yellowProjectsCount = data;
                return vm.yellowProjectsCount;
            });
        }

        function getGreenProjectsCount() {
            return dataService.getGreenProjectsCount().then(function (data) {
                vm.greenProjectsCount = data;
                return vm.greenProjectsCount;
            });
        }

        function getProjects() {
            return dataService.getProjects().then(function (data) {
                vm.resource.rows = angular.copy(data);
                return data;
            });
        }

        vm.getProjectsIconClass = function (value) {
            if (value === 'R') {
                return 'fa fa-times-circle red';
            } else if (value === 'Y') {
                return 'fa fa-warning orange';
            } else if (value === 'G') {
                return 'fa fa-circle green';
            }
        };

        vm.tableTheme = {
            iconUp: 'fa fa-chevron-circle-up',
            iconDown: 'fa fa-chevron-circle-down',
            listItemsPerPage: [5, 10, 20, 30],
            itemsPerPage: 10
        };

        vm.tableNotSortBy = ['overallStatus', 'budgetStatus',
            'resourceStatus', 'scheduleStatus'];

        vm.tableCenteredColumns = ['overallStatus', 'budgetStatus',
            'resourceStatus', 'scheduleStatus'];

        vm.resource = {
            'header': [
                {'name': 'Name'},
                {'overallStatus': 'Overall Status'},
                {'budgetStatus': 'Budget Status'},
                {'resourceStatus': 'Resource Status'},
                {'scheduleStatus': 'Schedule Status'},
                {'projectManager': 'Project Manager'}
            ],
            'pagination': {
                'page': 1
            },
            'sortBy': 'name',
            'sortOrder': 'asc'
        };

    }
})();
