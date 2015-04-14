(function () {
    'use strict';

    angular
        .module('app.form')
        .controller('FormController', FormController);

    FormController.$inject = ['$stateParams', 'logger'];
    /* @ngInject */
    function FormController($stateParams, logger) {
        var vm = this;
        vm.title = 'Form';
        vm.formID = $stateParams.formID;

        activate();

        function activate() {
            logger.info('Activated Form View');
            logger.info('Form ID: '+ vm.formID);
        }
    }
})();
