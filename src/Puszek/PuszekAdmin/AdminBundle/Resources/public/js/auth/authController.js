angular.module('puszekApp')
    .controller('authController', function authController($rootScope, $scope, $http, Config, AuthUser, $log) {

        $scope.loginFormData = {};
        $scope.error = null;

        $scope.doLogin = function() {
            $http.post(Config.baseUrl + '/login_check', $scope.loginFormData)
                .success(function(_response) {
                    $log.log('login response:', _response);
                    if (angular.isObject(_response)) {
                        if (_response.authenticated) {
                            AuthUser.reload();
                        } else {
                            $scope.error = _response.error;
                        }
                    }
                });
        }
    });
