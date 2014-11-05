angular.module('puszekApp')
    .config(function($stateProvider, $urlRouterProvider, Config) {

        $stateProvider
            .state('auth_login', {
                url: '/auth/login',
                templateUrl: Config.basePath + '/views/auth/login.html',
                controller: 'authController',
                data: {
                    access: {
                        loggedIn: false
                    }
                }
            })
            .state('auth_logout', {
                url: '/auth/logout',
                controller: function($http, AuthUser) {
                    $http.get(Config.baseUrl + '/logout')
                        .success(function() {
                            AuthUser.reload();
                            $state.go('homepage');
                        })
                },
                data: {
                    access: {
                        loggedIn: true
                    }
                }
            });
    });
