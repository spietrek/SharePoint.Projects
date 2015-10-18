(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('csgTopNav', csgTopNav);

  csgTopNav.$inject = ['$'];

  function csgTopNav($) {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '=',
        'navoptions': '='
      },
      templateUrl: 'app/layout/topnav/csg-top-nav.html'
    };

    function TopNavController() {
      var vm = this;
      // Set no validate on SharePoint's default form
      $('#aspnetForm').attr('novalidate', 'novalidate');
      // Hide Office 365 suite bar
      $('#suiteBarTop').css('display', 'none');
    }

    return directive;
  }
})();
