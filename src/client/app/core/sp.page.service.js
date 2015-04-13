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
            var info = {
                restUrl: 'https://cardinalsolutionsrtp.sharepoint.com/sites/projects' + '/_api'
            };
            return info;
        }
    }
})();
