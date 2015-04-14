(function() {
    'use strict';

    angular
        .module('app.form')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'form',
                config: {
                    url: '/form/:formID',
                    templateUrl: 'app/form/form.html',
                    controller: 'FormController',
                    controllerAs: 'vm',
                    title: 'Form'
                }
            }
        ];
    }
})();
