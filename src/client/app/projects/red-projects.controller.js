(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('RedProjectsController', RedProjectsController);

    RedProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function RedProjectsController($q, dataService, logger, ngTastyService) {
        var vm = this;
        vm.title = 'Red Projects';
        vm.tableTheme = ngTastyService.tableTheme();
        vm.tableNotSortBy = ngTastyService.tableNotSortBy();
        vm.tableCenteredColumns = ngTastyService.tableCenteredColumns();
        vm.resource = ngTastyService.resource();

        activate();

        function activate() {
            var promises = [getProjects()];
            return $q.all(promises).then(function () {
                logger.info('Activated Red Projects View');
            });
        }

        function getProjects() {
            return dataService.getRedProjects().then(function (data) {
                vm.redProjectsCount = dataService.getRedProjectsCount();
                vm.yellowProjectsCount = dataService.getYellowProjectsCount();
                vm.greenProjectsCount = dataService.getGreenProjectsCount();
                vm.totalProjectsCount = function () {
                    return vm.redProjectsCount + vm.yellowProjectsCount + vm.greenProjectsCount;
                };
                vm.resource.rows = data;
                return data;
            });
        }

        vm.getProjectsIconClass = function (value) {
            return ngTastyService.projectIconClass()[value];
        };
    }
})();
