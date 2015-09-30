(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', '$http', '$q', 'moment'];

    function AdminController(logger, $http, $q, moment) {
        var vm = this;
        vm.title = 'Admin';
        var restUrl = 'https://cardinalsolutionsrtp.sharepoint.com/sites/raimobile/_api/';
        var listDataSvcUrl = 'https://cardinalsolutionsrtp.sharepoint.com/sites/raimobile/_vti_bin/listdata.svc';
        var quiz = {
            title: 'Steve Pietrek Test',
            startDate: new Date(),
            endDate: new Date(),
            feedbackEachQuestion: 1,
            feedbackEnd: 1,
            questions: [],
            answerKey: [0,3,2,1,5]
        };

        activate();

        function activate() {
            logger.info('Activated Admin View');
        }

        function getItems(listName, selectFields, filter, expand) {
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
                    return restUrl + 'lists/' + this.method +
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
            var spQuery = {
                url: function () {
                    return listDataSvcUrl + '/' + listName;
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
            var model = {
                Title: quiz.title,
                StartDate: quiz.startDate,
                EndDate: quiz.endDate,
                FeedbackEachQuestion: quiz.feedbackEachQuestion === 1,
                FeedbackEnd: quiz.feedbackEnd === 1,
                Questions: JSON.stringify(quiz.questions),
                AnswerKey: JSON.stringify(quiz.answerKey)
            };
            createItem('QuizList', model).then(function (data) {
            });
        };

        vm.openItem = function() {
            var selectFields = 'ID,Title,StartDate,EndDate,FeedbackEachQuestion,FeedbackEnd,Questions,AnswerKey';
            var filter = 'ID eq 5';
            return getItems('QuizList', selectFields, filter).then(function (data) {
                if (data.length > 0) {
                    var item = data[0];
                    console.log(quiz);
                    console.log(item);
                    quiz.title = item.Title;
                    quiz.startDate = moment(item.StartDate).toDate();
                    quiz.endDate = moment(item.EndDate).toDate();
                    quiz.feedbackEachQuestion = item.FeedbackEachQuestion ? 1 : 0;
                    quiz.feedbackEnd = item.FeedbackEnd ? 1 : 0;
                    quiz.questions = JSON.parse(item.Questions);
                    quiz.answerKey = JSON.parse(item.AnswerKey);
                    console.log(quiz);
                    logger.success('Quiz was found');
                } else {
                    logger.error('Quiz could not be found.');
                }
            });
        };
    }
})();
