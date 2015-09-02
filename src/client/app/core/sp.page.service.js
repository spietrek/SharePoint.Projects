/*global _spPageContextInfo*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('spPageService', spPageService);

    function spPageService() {
        var service = {
            getInfo: getInfo
        };
        return service;

        function getInfo() {
            //var url = _spPageContextInfo.webAbsoluteUrl;
            var url = 'https://cardinalsolutionsrtp.sharepoint.com/sites/projects';
            var info = {
                restUrl: url + '/_api',
                listDataSvcUrl: url + '/_vti_bin/listdata.svc'
            };
            return info;
        }
    }
})();
