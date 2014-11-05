angular.module('puszekApp')
    .config(function($stateProvider, $urlRouterProvider, Config) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('homepage', {
                url: '/',
                templateUrl: Config.basePath + '/views/dashboard/index.html'
            });
    });
