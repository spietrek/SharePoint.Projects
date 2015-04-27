/*global angular*/
(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('GreenProjectsController', GreenProjectsController);

    GreenProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function GreenProjectsController($q, dataService, logger, ngTastyService) {
        var vm = this;
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
        vm.allProjectsCount = function () {
            return vm.redProjectsCount + vm.yellowProjectsCount + vm.greenProjectsCount;
        };
        vm.title = 'Green Projects';
        vm.searchText = '';
        vm.tableTheme = ngTastyService.tableTheme();
        vm.tableNotSortBy = ngTastyService.tableNotSortBy();
        vm.tableCenteredColumns = ngTastyService.tableCenteredColumns();
        vm.resource = ngTastyService.resource();

        activate();

        function activate() {
            var promises = [getProjects()];
            return $q.all(promises).then(function () {
                logger.info('Activated Green Projects View');
            });
        }

        function getProjects() {
            return dataService.getGreenProjects().then(function (data) {
                vm.redProjectsCount = dataService.getRedProjectsCount();
                vm.yellowProjectsCount = dataService.getYellowProjectsCount();
                vm.greenProjectsCount = dataService.getGreenProjectsCount();
                vm.resource.rows = data;
                return data;
            });
        }

        vm.getProjectsIconClass = function (value) {
            return ngTastyService.projectIconClass()[value];
        };
    }
})();
