(function () {
    'use strict';

    angular
        .module('app.projects')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['logger'];
    /* @ngInject */
    function ProjectsController(logger) {
        var vm = this;
        vm.title = 'Projects';

        activate();

        function activate() {
            logger.info('Activated Projects View');
        }
    }
})();
