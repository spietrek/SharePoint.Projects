(function () {
    'use strict';

    angular.module('app.form', [
            'app.core',
            'app.widgets',
            'formly',
            'formlyBootstrap'
        ],
        function config(formlyConfigProvider, formlyApiCheck) {
            // set templates here
            formlyConfigProvider.setType({
                name: 'multiInput',
                templateUrl: 'multiInput.html',
                defaultOptions: {
                    noFormControl: true,
                    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                    templateOptions: {
                        inputOptions: {
                            wrapper: null
                        }
                    }
                },
                controller: /* @ngInject */ function ($scope) {
                    $scope.copyItemOptions = copyItemOptions;

                    function copyItemOptions() {
                        return angular.copy($scope.to.inputOptions);
                    }
                }
            });
        });
})();
