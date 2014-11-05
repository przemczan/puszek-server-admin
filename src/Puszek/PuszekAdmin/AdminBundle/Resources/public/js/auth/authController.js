angular.module('puszekApp')
    .controller('authController', function($scope, $http, Config) {

        $scope.loginFormData = {};

        $scope.doLogin = function() {
            $http.post(Config.baseUrl + '/check-login', $scope.loginFormData);
        }
    });
