(function () {
    'use strict';

    angular
        .module('app.form')
        .controller('FormController', FormController);

    FormController.$inject = ['logger'];
    /* @ngInject */
    function FormController(logger) {
        var vm = this;
        vm.title = 'Form';

        activate();

        function activate() {
            logger.info('Activated Form View');
        }
    }
})();
