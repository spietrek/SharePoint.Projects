(function () {
  'use strict';

  angular
    .module('app.form')
    .factory('formFields', formFields);

  function formFields() {
    var srv = {};

    srv.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Project Name',
          required: true
        },
        'validation': {
          'show': true
        }
      },
      {
        'key': 'overallStatus',
        'type': 'select',
        'templateOptions': {
          'label': 'Overall Status',
          required: true,
          'options': [
            {
              'name': 'Green',
              'value': 'G'
            },
            {
              'name': 'Yellow',
              'value': 'Y'
            },
            {
              'name': 'Red',
              'value': 'R'
            }
          ]
        },
        'validation': {
          'show': true
        }
      },
      {
        'key': 'budgetStatus',
        'type': 'select',
        'templateOptions': {
          'label': 'Budget Status',
          required: true,
          'options': [
            {
              'name': 'Green',
              'value': 'G'
            },
            {
              'name': 'Yellow',
              'value': 'Y'
            },
            {
              'name': 'Red',
              'value': 'R'
            }
          ]
        },
        'validation': {
          'show': true
        }
      },
      {
        'key': 'resourceStatus',
        'type': 'select',
        'templateOptions': {
          'label': 'Resource Status',
          required: true,
          'options': [
            {
              'name': 'Green',
              'value': 'G'
            },
            {
              'name': 'Yellow',
              'value': 'Y'
            },
            {
              'name': 'Red',
              'value': 'R'
            }
          ]
        },
        'validation': {
          'show': true
        }
      },
      {
        'key': 'scheduleStatus',
        'type': 'select',
        'templateOptions': {
          'label': 'Schedule Status',
          required: true,
          'options': [
            {
              'name': 'Green',
              'value': 'G'
            },
            {
              'name': 'Yellow',
              'value': 'Y'
            },
            {
              'name': 'Red',
              'value': 'R'
            }
          ]
        },
        'validation': {
          'show': true
        }
      },
      {
        key: 'projectManager',
        type: 'input',
        templateOptions: {
          label: 'Project Manager',
          required: true
        },
        'validation': {
          'show': true
        }
      },
      {
        key: 'plannedEndDate',
        type: 'input',
        templateOptions: {
          label: 'Planned End Date',
          required: true,
          type: 'date'
        },
        'validation': {
          'show': true
        }
      },
      {
        key: 'notes',
        type: 'textarea',
        templateOptions: {
          label: 'Notes'
        }
      },
      {
        key: 'risks',
        type: 'textarea',
        templateOptions: {
          label: 'Risks'
        }
      }
    ];

    return {
      fields: function () {
        return srv.fields;
      }
    };
  }
})();
