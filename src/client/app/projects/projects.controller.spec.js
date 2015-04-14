/* jshint -W117, -W030 */
describe('ProjectsController', function () {
    var controller;
    var projects = mockData.getMockProjects();

    beforeEach(function () {
        bard.appModule('app.projects');
        bard.inject('$controller', '$log', '$q', '$rootScope', 'dataService', '$state');
    });

    beforeEach(function () {
        sinon.stub(dataService, 'getProjects').returns($q.when(projects));
        controller = $controller('ProjectsController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('after activate', function () {
        it('should have title of Projects', function () {
            expect(controller.title).to.equal('Projects');
        });

        it('should have title of Projects', function () {
            expect(controller.title).to.equal('Projects');
        });

        it('should have logged "Activated"', function () {
            expect($log.info.logs).to.match(/Activated/);
        });

        it('should have at least 1 project', function () {
            expect(controller.resource.rows).to.have.length.above(0);
        });

        it('should have projects count of 5', function () {
            expect(controller.resource.rows).to.have.length(5);
        });

        it('first projects name should equal Project Aardvark', function () {
            var firstItem = controller.resource.rows[0];
            expect(firstItem.name).to.equal('Project Aardvark');
        });

    });

});
