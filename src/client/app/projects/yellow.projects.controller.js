(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('YellowProjectsController', YellowProjectsController);

    YellowProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function YellowProjectsController($q, dataService, logger, ngTastyService) {
        var vm = this;
        var currentState = 'yellow';
        vm.redProjectsCount = 0;
        vm.yellowProjectsCount = 0;
        vm.greenProjectsCount = 0;
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
                logger.info('Activated Red Projects View');
            });
        }

        function getProjects() {
            return dataService.getProjects(currentState).then(function (data) {
                vm.redProjectsCount = data.redCounts;
                vm.yellowProjectsCount = data.yellowCounts;
                vm.greenProjectsCount = data.greenCounts;
                vm.resource.rows = angular.copy(data.projects);
                return data;
            });
        }

        vm.getProjectsIconClass = function (value) {
            return ngTastyService.projectIconClass()[value];
        };
    }
})();
