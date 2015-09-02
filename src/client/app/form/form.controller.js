(function () {
    'use strict';

    angular
        .module('app.form')
        .controller('FormController', FormController);

    FormController.$inject = ['$stateParams', '$state', '$q', 'logger', 'dataService',
                              'formFields'];

    function FormController($stateParams, $state, $q, logger, dataService, formFields) {
        var vm = this;
        vm.title = 'Form';
        vm.formID = $stateParams.formID;
        vm.fields = formFields.fields();
        vm.onSubmit = onSubmit;

        activate();

        function activate() {
            var promises = [getProject()];
            return $q.all(promises).then(function () {
                logger.info('Activated Form View');
            });
        }

        function getProject() {
            return dataService.getProject(vm.formID).then(function (data) {
                vm.model = (data === null) ? getDefaultModel() : data;
                return vm.model;
            });
        }

        function getDefaultModel() {
            var model = {
                risks: ['']
            };

            return model;
        }

        function onSubmit() {
            dataService.saveProject(vm.model).then(function () {
                $state.transitionTo('projects');
            });
        }
    }
})();
