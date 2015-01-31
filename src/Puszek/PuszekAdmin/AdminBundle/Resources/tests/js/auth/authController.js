var users = {
    'admin': {
        user: { fullName: 'Administrator'},
        roles: { ROLE_ADMIN: true, ROLE_USER: true },
        data: null
    }
};

describe('puszekApp.authController', function() {

    var $controller, $httpBackend, AuthUser;

    function flushInitialAuthRequests()
    {
        $httpBackend.when('POST', '/auth/me').respond(200, null);
        $httpBackend.when('GET', '/views/auth/login.html').respond(200);
        $httpBackend.flush();
    }

    beforeEach(module('puszekApp'));

    beforeEach(function() {
        angular.module('puszekApp').constant('Config', {
            baseUrl: '',
            basePath: ''
        });
    });

    beforeEach(inject(function(_$controller_, _$httpBackend_, _AuthUser_){
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        AuthUser = _AuthUser_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('doLogin function', function() {
        it('should reload AuthUser on successfull login', function() {
            var $scope = {};

            flushInitialAuthRequests();

            $controller('authController', { $scope: $scope });
            $scope.loginFormData = { login: 'login', 'password' : 'password' };
            $httpBackend.when('POST', '/login_check').respond(200, { authenticated: true });
            spyOn(AuthUser, 'reload');

            $scope.doLogin();

            $httpBackend.expectPOST('/login_check');
            $httpBackend.flush();
            expect(AuthUser.reload).toHaveBeenCalled();
            expect($scope.error).toBe(null);
        });
        it('should not reload AuthUser on login failure', function() {
            var $scope = {};

            flushInitialAuthRequests();

            $controller('authController', { $scope: $scope });
            $scope.loginFormData = {};
            $httpBackend.when('POST', '/login_check').respond(200, { authenticated: false, error: 'error' });
            spyOn(AuthUser, 'reload');

            $scope.doLogin();

            $httpBackend.expectPOST('/login_check');
            $httpBackend.flush();
            expect(AuthUser.reload).not.toHaveBeenCalled();
            expect($scope.error).toBe('error');
        });
    });
});