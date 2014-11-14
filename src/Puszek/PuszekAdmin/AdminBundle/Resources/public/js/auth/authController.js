angular.module('puszekApp')
    .controller('authController', function($rootScope, $scope, $http, Config, AuthUser, $log) {

        $scope.loginFormData = {};
        $scope.error = '';

        $scope.doLogin = function() {
            $http.post(Config.baseUrl + '/login_check', $scope.loginFormData)
                .success(function(_response) {
                    $log.log('login response:', _response);
                    if (angular.isObject(_response)) {
                        if (_response.authenticated) {
                            AuthUser.reload().success(function() {
                                $rootScope.$broadcast('auth.login');
                            });
                        } else {
                            $scope.error = _response.error;
                        }
                    }
                });
        }
    });