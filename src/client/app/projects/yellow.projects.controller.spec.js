/* jshint -W117, -W030 */
describe('YellowProjectsController', function () {
    var controller;
    var projects = mockData.getMockYellowProjects();

    beforeEach(function () {
        bard.appModule('app.projects');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataService');
    });

    beforeEach(function () {
        sinon.stub(dataService, 'getProjects').returns($q.when(projects));
        controller = $controller('YellowProjectsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Projects controller', function () {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });

        describe('after activate', function () {
            it('should have title of Yellow Projects', function () {
                expect(controller.title).to.equal('Yellow Projects');
            });

            it('should have logged "Activated"', function () {
                expect($log.info.logs).to.match(/Activated/);
            });

            it('should have at least 1 project', function () {
                expect(controller.resource.rows).to.have.length.above(0);
            });

            it('should have projects count of 2', function () {
                expect(controller.resource.rows).to.have.length(2);
            });

            it('should have correct project icon class when status is R', function () {
                var value = controller.getProjectsIconClass('R');
                expect(value).to.equal('fa fa-times-circle red');
            });

            it('should have correct project icon class when status is Y', function () {
                var value = controller.getProjectsIconClass('Y');
                expect(value).to.equal('fa fa-warning orange');
            });

            it('should have correct project icon class when status is G', function () {
                var value = controller.getProjectsIconClass('G');
                expect(value).to.equal('fa fa-circle green');
            });

            it('should be undefined when status is not R, Y, or G', function () {
                var value = controller.getProjectsIconClass('NOTHING');
                expect(value).to.not.be.defined;
            });
        });
    });
});
