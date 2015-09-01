(function () {
    'use strict';

    angular
        .module('app.projects')
        .directive('csgWidgetDashboard', csgWidgetDashboard);

    function csgWidgetDashboard() {
        var directive = {
            scope: {
                'href': '@',
                'color': '@',
                'header': '@',
                'count': '@',
                'icon': '@'
            },
            templateUrl: 'app/projects/dashboard.html',
            restrict: 'EA',
            controller: ['$scope', function ($scope) {
                $scope.getBackgroundColor = function() {
                    return $scope.color;
                };
                $scope.getDashboardIcon = function() {
                    return $scope.icon;
                };
            }]
        };
        return directive;
    }
})();
