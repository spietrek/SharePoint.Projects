(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('YellowProjectsController', YellowProjectsController);

    YellowProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function YellowProjectsController($q, dataService, logger, ngTastyService) {
        var vm = this;
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
        vm.totalProjectsCount = function () {
            return vm.redProjectsCount + vm.yellowProjectsCount + vm.greenProjectsCount;
        };
        vm.title = 'Yellow Projects';
        vm.searchText = '';
        vm.tableTheme = ngTastyService.tableTheme();
        vm.tableNotSortBy = ngTastyService.tableNotSortBy();
        vm.tableCenteredColumns = ngTastyService.tableCenteredColumns();
        vm.resource = ngTastyService.resource();

        activate();

        function activate() {
            var promises = [getProjects()];
            return $q.all(promises).then(function () {
                logger.info('Activated Yellow Projects View');
            });
        }

        function getProjects() {
            return dataService.getYellowProjects().then(function (data) {
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