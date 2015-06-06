(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('csgWidgetHeader', csgWidgetHeader);

    /* @ngInject */
    function csgWidgetHeader() {
        //Usage:
        //<div csg-widget-header title="vm.map.title"></div>
        // Creates:
        // <div csg-widget-header=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@',
                'allowCollapse': '@'
            },
            templateUrl: 'app/widgets/widget-header.html',
            restrict: 'EA'
        };
        return directive;
    }
})();
