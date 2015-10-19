(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('csgSidebarContainer', csgSidebarContainer);

  function csgSidebarContainer() {
    var directive = {
      restrict: 'EA',
      scope: true,
      templateUrl: 'app/layout/sidebar/sidebar.html'
    };
    return directive;
  }
})();
