(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('csgWidgetHeader', csgWidgetHeader);

    function csgWidgetHeader() {
        var directive = {
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/widgets/header.html',
            restrict: 'EA'
        };
        return directive;
    }
})();
