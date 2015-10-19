(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('csgShellContainer', csgShellContainer);

  function csgShellContainer() {
    var directive = {
      restrict: 'EA',
      scope: true,
      templateUrl: 'app/layout/shell/shell.html'
    };
    return directive;
  }
})();
