describe('puszekApp.auth.firewall', function() {

    var $httpBackend, AuthUser, $rootScope, $state;

    angular.module('puszekApp').config(function($stateProvider) {
        $stateProvider
            .state('_restricted_area_', {
                url: '/_restricted_area_',
                data: {
                    access: {
                        all: ['ROLE_MEGA_ADMIN']
                    }
                }
            })
    });

    function flushInitialRequests(_user)
    {
        $httpBackend.when('POST', '/auth/me').respond(200, _user);
        $httpBackend.when('GET', '/views/dashboard/index.html').respond(200);
        $httpBackend.flush();
    }

    beforeEach(module('puszekApp'));

    beforeEach(function() {
        angular.module('puszekApp').constant('Config', {
            baseUrl: '',
            basePath: ''
        });
    });

    beforeEach(inject(function(_$httpBackend_, _AuthUser_, _$rootScope_, _$state_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        AuthUser = _AuthUser_;
        $state = _$state_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('firewall', function() {
        it('should grant access to dashboard page', function() {
            var onUserLoginHasBeenCalled = false;
            $rootScope.$on('auth.login', function() {
                onUserLoginHasBeenCalled = true;
            });
            $httpBackend.expectGET('/views/dashboard/index.html');
            flushInitialRequests(users.admin);
            expect(onUserLoginHasBeenCalled).toBe(true);
        });
        it('should deny access to some restricted page', function() {
            $httpBackend.expectGET('/views/dashboard/index.html');
            flushInitialRequests(users.admin);
            var prevStateName = $state.current.name;
            $state.go('_restricted_area_');
            $rootScope.$digest();
            expect($state.current.name).toBe(prevStateName);
        });
    });
});