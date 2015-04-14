/*global _spPageContextInfo*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('ngTastyService', ngTastyService);

    function ngTastyService() {
        var srv = {};

        srv.tableTheme = {
            iconUp: 'fa fa-chevron-circle-up',
            iconDown: 'fa fa-chevron-circle-down',
            listItemsPerPage: [5, 10, 20, 30],
            itemsPerPage: 10
        };

        srv.tableNotSortBy = ['overallStatus', 'budgetStatus',
            'resourceStatus', 'scheduleStatus'];

        srv.tableCenteredColumns = ['overallStatus', 'budgetStatus',
            'resourceStatus', 'scheduleStatus', 'edit'];

        srv.resource = {
            'header': [
                {'name': 'Name'},
                {'overallStatus': 'Overall Status'},
                {'budgetStatus': 'Budget Status'},
                {'resourceStatus': 'Resource Status'},
                {'scheduleStatus': 'Schedule Status'},
                {'projectManager': 'Project Manager'},
                {'edit': 'Edit'}
            ],
            'rows': [],
            'pagination': {
                'page': 1
            },
            'sortBy': 'name',
            'sortOrder': 'asc'
        };

        return {
            tableTheme: function() {
                return srv.tableTheme;
            },
            tableNotSortBy: function() {
                return srv.tableNotSortBy;
            },
            tableCenteredColumns: function() {
                return srv.tableCenteredColumns;
            },
            resource: function() {
                return srv.resource;
            }
        }

    }
})();
