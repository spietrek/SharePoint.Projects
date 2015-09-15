/*global _spPageContextInfo*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('spPageService', spPageService);

    spPageService.$inject = ['$window'];

    function spPageService($window) {
        var service = {
            getInfo: getInfo
        };
        return service;

        function getInfo() {
            var url = $window._spPageContextInfo.webAbsoluteUrl;
            var info = {
                restUrl: url + '/_api',
                listDataSvcUrl: url + '/_vti_bin/listdata.svc'
            };
            return info;
        }
    }
})();
