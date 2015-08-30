(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];
    /* @ngInject */
    function ProjectsController($q, dataService, logger, ngTastyService) {
        var vm = this;
        vm.title = 'All Projects';
        vm.resource = ngTastyService.resource();

        activate();

        function activate() {
            var promises = [getProjects()];
            return $q.all(promises).then(function () {
                logger.info('Activated All Projects View');
            });
        }

        function getProjects() {
            return dataService.getProjects().then(function (data) {
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
    }
})();
