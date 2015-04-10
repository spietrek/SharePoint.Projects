(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataService', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataService, logger) {
        var vm = this;
        vm.news = {
            title: 'projects',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.projectx = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getRedProjectsCount(), getProjects()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getRedProjectsCount() {
            return dataService.getRedProjectsCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getProjects() {
            return dataService.getProjects().then(function (data) {
                vm.projects = data;
                return vm.projects;
            });
        }
    }
})();
