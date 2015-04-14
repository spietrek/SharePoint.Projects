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
            var url = 'https://cardinalsolutionsrtp.sharepoint.com/sites/projects';
            var info = {
                restUrl: url + '/_api',
                listDataSvcUrl: url + '/_vti_bin/listdata.svc'
                //restUrl: _spPageContextInfo.webAbsoluteUrl + '/_api'
            };
            return info;
        }
    }
})();
