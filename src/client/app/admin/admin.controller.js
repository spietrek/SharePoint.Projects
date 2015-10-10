(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', '$http', '$q', 'moment'];

    function AdminController(logger, $http, $q, moment) {
        var vm = this;
        vm.title = 'Admin';
        activate();

        function activate() {
            logger.info('Activated Admin View');
        }
    }
})();
