(function () {
  'use strict';

  angular
    .module('app.projects')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'all',
        config: {
          url: '/all',
          templateUrl: 'app/projects/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          title: 'All Projects',
          settings: {
            nav: 1,
            content: '<i class="fa fa-folder-open"></i> All Projects'
          }
        }
      },
      {
        state: 'red',
        config: {
          url: '/red',
          templateUrl: 'app/projects/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          title: 'Red Projects',
          settings: {
            nav: 2,
            content: '<i class="fa fa-warning"></i> Red Projects'
          }
        }
      },
      {
        state: 'yellow',
        config: {
          url: '/yellow',
          templateUrl: 'app/projects/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          title: 'Yellow Projects',
          settings: {
            nav: 3,
            content: '<i class="fa fa-info-circle"></i> Yellow Projects'
          }
        }
      },
      {
        state: 'green',
        config: {
          url: '/green',
          templateUrl: 'app/projects/projects.html',
          controller: 'ProjectsController',
          controllerAs: 'vm',
          title: 'Green Projects',
          settings: {
            nav: 4,
            content: '<i class="fa fa-thumbs-up"></i> Green Projects'
          }
        }
      }
    ];
  }
})();
