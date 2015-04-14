/* jshint -W117, -W030 */
describe('form routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/form/form.html';

        beforeEach(function() {
            module('app.form', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        /*it('should map state form to url /form ', function() {
         expect($state.href('form', {})).to.equal('#/form');
         });

         it('should map /form route to form View template', function () {
         expect($state.get('form').templateUrl).to.equal(view);
         });

         it('of form should work with $state.go', function () {
         $state.go('form');
         $rootScope.$apply();
         expect($state.is('form'));
         });*/
    });
});
