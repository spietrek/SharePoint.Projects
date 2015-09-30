(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger'];

    function AdminController(logger) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }

        function getItems(listName, selectFields, filter, expand) {
            // Need to update spPageService.info().restUrl to point to other site
            var restQuery = {
                method: 'getbytitle(\'' + listName + '\')/items',
                getSelectFields: function () {
                    return selectFields !== '' ? '&$select=' + selectFields : '';
                },
                getFilter: function () {
                    return (angular.isDefined(filter) && filter !== '') ? '&$filter=' + filter : '';
                },
                getExpand: function () {
                    return (angular.isDefined(expand) && expand !== '') ? '&$expand=' + expand : '';
                },
                url: function () {
                    return spPageService.info().restUrl + 'lists/' + this.method +
                        '?$top=1000' + this.getSelectFields() + this.getFilter() + this.getExpand() +
                        '&$orderBy=Title';
                }
            };

            var req = {
                method: 'GET',
                url: restQuery.url(),
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            };

            return $http(req)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.d.results;
            }

            function fail(error) {
                var msg = 'Query for items failed.  (' + error.status + ') ' +
                    error.statusText;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function createItem(listName, payload) {
            // Need to update spPageService.info().restUrl to point to other site
            var spQuery = {
                url: function () {
                    return spPageService.info().listDataSvcUrl + '/' + listName;
                }
            };

            var createRequest = {
                url: spQuery.url(),
                method: 'POST',
                processData: false,
                contentType: 'application/json;odata=verbose',
                data: JSON.stringify(payload),
                dataType: 'json'
            };

            return $http(createRequest)
                .then(success)
                .catch(fail);

            function success(response) {
                return $q.when(response);
            }

            function fail(error) {
                var msg = 'Query for creating item failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        vm.saveItem = function() {
            // Need to update quiz model
            var quiz = {
                title: 'Steve Pietrek Test',
                questions: [],
                answerKey: []
            }
            // Need to update model for all fields
            var model = {
                Title: quiz.title,
                Questions: JSON.stringify(this.quiz.questions),
                AnswerKey: JSON.stringify(this.quiz.answerKey)
            };
            // Need to update list name
            dataService.createItem('Requests', model).then(function (data) {
            });
        }

        vm.openItem = function() {
            // Need to update select fields
            var selectFields = 'ID,Questions,AnswerKey';
            // Need to update item index
            var filter = 'ID eq 10';
            // Need to update list name
            return dataService.getItems('Requests', selectFields, filter).then(function (data) {
                if (data.length > 0) {
                    logger.success('Quiz was found');
                    console.log(data);
                } else {
                    logger.error('Quiz could not be found.');
                }
            });
        }
    }
})();
