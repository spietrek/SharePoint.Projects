(function () {
  'use strict';

  angular
    .module('app.form')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'edit',
        config: {
          url: '/edit/:formID',
          templateUrl: 'app/form/form.html',
          controller: 'FormController',
          controllerAs: 'vm',
          title: 'Edit'
        }
      },
      {
        state: 'create',
        config: {
          url: '/form/',
          templateUrl: 'app/form/form.html',
          controller: 'FormController',
          controllerAs: 'vm',
          title: 'Create Project',
          settings: {
            nav: 5,
            content: '<i class="fa fa-plus"></i> Create Project'
          }
        }
      }
    ];
  }
})();
