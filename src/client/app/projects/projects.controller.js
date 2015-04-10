(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$q', '$filter', 'dataService', 'logger'];
    /* @ngInject */
    function ProjectsController($q, $filter, dataService, logger) {
        var vm = this;
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
        vm.projects = [];
        vm.filteredProjects = [];
        vm.title = 'Projects';
        vm.searchText = '';

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
                vm.projects = data;
                vm.filteredProjects = data;
                return vm.projects;
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

        vm.config = {
            itemsPerPage: 10,
            fillLastPage: true
        };

        vm.updateFilteredList = function() {
            vm.filteredProjects = $filter('filter')(vm.projects, vm.searchText);
        };
    }
})();
