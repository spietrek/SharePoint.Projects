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

        vm.fields = [
            {
                key: 'name',
                type: 'input',
                templateOptions: {
                    label: 'Project Name',
                    required: true
                },
                'validation': {
                    'show': true
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
                },
                'validation': {
                    'show': true
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
                },
                'validation': {
                    'show': true
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
                },
                'validation': {
                    'show': true
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
                },
                'validation': {
                    'show': true
                }
            },
            {
                key: 'projectManager',
                type: 'input',
                templateOptions: {
                    label: 'Project Manager',
                    required: true
                },
                'validation': {
                    'show': true
                }
            },
            {
                key: 'plannedEndDate',
                type: 'input',
                templateOptions: {
                    label: 'Planned End Date',
                    required: true,
                    type: 'date'
                },
                'validation': {
                    'show': true
                }
            },
            {
                key: 'notes',
                type: 'textarea',
                templateOptions: {
                    label: 'Notes'
                }
            },
            {
                key: 'risks',
                type: 'multiInput',
                templateOptions: {
                    label: 'Risks',
                    inputOptions: {
                        type: 'input'
                    }
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
