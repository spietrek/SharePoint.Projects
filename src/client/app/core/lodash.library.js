(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('lodash', lodash);

    function lodash() {
        return window._; // assumes lodash has already been loaded on the page
    }
})();
