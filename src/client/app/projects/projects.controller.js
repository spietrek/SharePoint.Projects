(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$state', '$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function ProjectsController($state, $q, dataService, logger, ngTastyService) {
        var vm = this;
        var currentState = $state.current.name;
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
        vm.title = 'Projects';
        vm.searchText = '';
        vm.tableTheme = ngTastyService.tableTheme();
        vm.tableNotSortBy = ngTastyService.tableNotSortBy();
        vm.tableCenteredColumns = ngTastyService.tableCenteredColumns();
        vm.resource = ngTastyService.resource();

        activate();

        function activate() {
            var promises = [getProjects()];
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
            return dataService.getProjects(currentState).then(function (data) {
                getRedProjectsCount();
                getYellowProjectsCount();
                getGreenProjectsCount();
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
    }
})();
