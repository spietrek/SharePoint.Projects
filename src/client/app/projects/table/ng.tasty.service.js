(function () {
  'use strict';

  angular
    .module('app.projects')
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
            'resourceStatus', 'scheduleStatus', 'risksCount', 'edit'];

    srv.resource = {
      'header': [
        {
          key: 'title',
          name: 'Name'
        },
        {
          key: 'overall',
          name: 'Overall',
          style: {
            'text-align': 'center'
          }
        },
        {
          key: 'budget',
          name: 'Budget',
          style: {
            'text-align': 'center'
          }
        },
        {
          key: 'resource',
          name: 'Resource',
          style: {
            'text-align': 'center'
          }
        },
        {
          key: 'schedule',
          name: 'Schedule',
          style: {
            'text-align': 'center'
          }
        },
        {
          key: 'projectManager',
          name: 'Project Manager'
        },
        {
          key: 'risks',
          name: 'Risks',
          style: {
            'text-align': 'center'
          }
        },
        {
          key: 'edit',
          name: 'Edit',
          style: {
            'text-align': 'center'
          }
        }
      ],
      'rows': [],
      'pagination': {
        'page': 1
      },
      'sortBy': 'name',
      'sortOrder': 'asc'
    };

    srv.projectIconClass = {
      'R': 'fa fa-times-circle red',
      'Y': 'fa fa-warning orange',
      'G': 'fa fa-circle green'
    };

    return {
      tableTheme: function () {
        return srv.tableTheme;
      },
      tableNotSortBy: function () {
        return srv.tableNotSortBy;
      },
      tableCenteredColumns: function () {
        return srv.tableCenteredColumns;
      },
      resource: function () {
        return srv.resource;
      },
      projectIconClass: function () {
        return srv.projectIconClass;
      }
    };
  }
})();