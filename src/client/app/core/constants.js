/* global toastr:false, moment:false, _: false, $: false, _spPageContextInfo: false */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('lodash', _)
        .constant('$', $)
        .constant('_spPageContextInfo', _spPageContextInfo);
})();
