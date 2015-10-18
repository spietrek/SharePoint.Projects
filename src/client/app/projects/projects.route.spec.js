/* jshint -W117, -W030 */
describe('projects routes', function () {
  describe('state', function () {
    var controller;
    var view = 'app/projects/projects.html';

    beforeEach(function () {
      module('app.projects', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(view, '');
    });

    it('should map state all to url / ', function () {
      expect($state.href('all', {})).to.equal('#/all');
    });

    it('should map /all route to admin View template', function () {
      expect($state.get('all').templateUrl).to.equal(view);
    });

    it('of admin should work with $state.go', function () {
      $state.go('all');
      $rootScope.$apply();
      expect($state.is('projects'));
    });
  });
});
