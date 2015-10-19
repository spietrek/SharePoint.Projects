(function () {
  'use strict';

  angular
    .module('app.projects')
    .directive('csgDashboard', csgDashboard);

  function csgDashboard() {
    var directive = {
      scope: {
        'href': '@',
        'color': '@',
        'header': '@',
        'count': '@',
        'icon': '@'
      },
      templateUrl: 'app/projects/dashboard/dashboard.html',
      restrict: 'EA',
      controller: ['$scope', function ($scope) {
        $scope.getBackgroundColor = function () {
          return $scope.color;
        };
        $scope.getDashboardIcon = function () {
          return $scope.icon;
        };
      }]
    };
    return directive;
  }
})();
