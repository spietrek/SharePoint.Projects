/* jshint -W117, -W030 */
describe('FormController', function () {
  var controller;

  beforeEach(function () {
    bard.appModule('app.form');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    controller = $controller('FormController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Form controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Form', function () {
        expect(controller.title).to.equal('Form');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
