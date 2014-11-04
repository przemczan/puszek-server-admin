angular.module('puszekApp')
    .config(['$routeProvider', 'Config', function($routeProvider, Config) {
        $routeProvider
            .when('/', {
                templateUrl: Config.basePath + '/views/dashboard/index.html',
                controller: 'mainMenuController'
            });
    }]);