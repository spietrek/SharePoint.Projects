(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$q', 'dataService', 'logger', 'ngTastyService'];

  function ProjectsController($q, dataService, logger, ngTastyService) {
    var vm = this;
    vm.resource = ngTastyService.resource();

    activate();

    function activate() {
      var promises = [getProjects()];
      return $q.all(promises).then(function () {
        logger.info('Activated Projects View');
      });
    }

    function getProjects() {
      return dataService.getProjects().then(function (data) {
        vm.redProjectsCount = dataService.getRedProjectsCount();
        vm.yellowProjectsCount = dataService.getYellowProjectsCount();
        vm.greenProjectsCount = dataService.getGreenProjectsCount();
        vm.totalProjectsCount = dataService.getTotalProjectsCount();
        vm.resource.rows = data;
        vm.title = dataService.getTitle();
        return data;
      });
    }
  }
})();
