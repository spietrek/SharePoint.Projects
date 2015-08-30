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
                'count': '@'
            },
            templateUrl: 'app/projects/dashboard.html',
            restrict: 'EA',
            controller: ['$scope', function ($scope) {
                $scope.getBackgroundColor = function() {
                    return $scope.color;
                };
            }]
        };
        return directive;
    }
})();
