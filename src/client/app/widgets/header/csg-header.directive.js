(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('csgHeader', csgHeader);

  function csgHeader() {
    var directive = {
      scope: {
        'title': '@',
        'subtitle': '@',
        'rightText': '@',
        'allowCollapse': '@'
      },
      templateUrl: 'app/widgets/header/header.html',
      restrict: 'EA'
    };
    return directive;
  }
})();
