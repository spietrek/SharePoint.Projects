(function () {
  'use strict';

  angular
    .module('app.projects')
    .directive('csgTable', csgTable);

  function csgTable() {
    var directive = {
      scope: {
        'resource': '='
      },
      templateUrl: 'app/projects/table/table.html',
      restrict: 'EA',
      controller: ['$scope', 'ngTastyService', 'dataService', function ($scope, ngTastyService, dataService) {
        $scope.tableTheme = ngTastyService.tableTheme();
        $scope.tableNotSortBy = ngTastyService.tableNotSortBy();
        $scope.tableCenteredColumns = ngTastyService.tableCenteredColumns();
        $scope.resource = ngTastyService.resource();
        $scope.getProjectsIconClass = function (value) {
          return ngTastyService.projectIconClass()[value];
        };
      }]
    };
    return directive;
  }
})();
