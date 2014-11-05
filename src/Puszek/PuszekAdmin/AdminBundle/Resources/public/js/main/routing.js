angular.module('puszekApp')
    .config(function($stateProvider, Config) {
        $stateProvider
            .state('homepage', {
                url: '/',
                templateUrl: Config.basePath + '/views/dashboard/index.html'
            });
    });
