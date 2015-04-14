(function () {
    'use strict';

    angular
        .module('app.form')
        .controller('FormController', FormController);

    FormController.$inject = ['$stateParams', '$state', '$q', 'logger', 'dataService'];
    /* @ngInject */
    function FormController($stateParams, $state, $q, logger, dataService) {
        var vm = this;
        vm.title = 'Form';
        vm.formID = $stateParams.formID;

        activate();

        function activate() {
            var promises = [getProject()];
            return $q.all(promises).then(function () {
                logger.info('Activated Form View');
            });
        }

        function getProject() {
            return dataService.getProject(vm.formID).then(function (data) {
                vm.model = data;
                return vm.redProjectsCount;
            });
        }

        vm.model = {};

        vm.fields = [
            {
                key: 'name',
                type: 'input',
                model: vm.model.name,
                templateOptions: {
                    label: 'Project Name',
                    required: true
                }
            },
            {
                'key': 'overallStatus',
                'type': 'select',
                'templateOptions': {
                    'label': 'Overall Status',
                    required: true,
                    'options': [
                        {
                            'name': 'Green',
                            'value': 'G'
                        },
                        {
                            'name': 'Yellow',
                            'value': 'Y'
                        },
                        {
                            'name': 'Red',
                            'value': 'R'
                        }
                    ]
                }
            },
            {
                'key': 'budgetStatus',
                'type': 'select',
                'templateOptions': {
                    'label': 'Budget Status',
                    required: true,
                    'options': [
                        {
                            'name': 'Green',
                            'value': 'G'
                        },
                        {
                            'name': 'Yellow',
                            'value': 'Y'
                        },
                        {
                            'name': 'Red',
                            'value': 'R'
                        }
                    ]
                }
            },
            {
                'key': 'resourceStatus',
                'type': 'select',
                'templateOptions': {
                    'label': 'Resource Status',
                    required: true,
                    'options': [
                        {
                            'name': 'Green',
                            'value': 'G'
                        },
                        {
                            'name': 'Yellow',
                            'value': 'Y'
                        },
                        {
                            'name': 'Red',
                            'value': 'R'
                        }
                    ]
                }
            },
            {
                'key': 'scheduleStatus',
                'type': 'select',
                'templateOptions': {
                    'label': 'Schedule Status',
                    required: true,
                    'options': [
                        {
                            'name': 'Green',
                            'value': 'G'
                        },
                        {
                            'name': 'Yellow',
                            'value': 'Y'
                        },
                        {
                            'name': 'Red',
                            'value': 'R'
                        }
                    ]
                }
            },
            {
                key: 'projectManager',
                type: 'input',
                model: vm.model.projectManager,
                templateOptions: {
                    label: 'Project Manager',
                    required: true
                }
            }
        ];

        vm.onSubmit = onSubmit;

        function onSubmit() {
            dataService.saveProject(vm.model).then(function () {
                $state.transitionTo('projects');
            });
        }
    }
})();
