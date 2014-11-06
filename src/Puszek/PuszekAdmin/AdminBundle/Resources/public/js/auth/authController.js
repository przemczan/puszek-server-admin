angular.module('puszekApp')
    .controller('authController', function($scope, $http, Config, AuthUser, $log) {

        $scope.loginFormData = {};

        $scope.doLogin = function() {
            $http.post(Config.baseUrl + '/login_check', $scope.loginFormData)
                .success(function(_response) {
                    if (angular.isObject(_response)) {
                        if (_response.authenticated) {
                            AuthUser.reload();
                        } else {
                            $log.warn(_response.error);
                        }
                    }
                });
        }
    });
