angular.module('puszekApp')
    .config(['$routeProvider', 'Config', function($routeProvider, Config) {
        $routeProvider
            .when('/', {
                templateUrl: Config.basePath + '/views/dashboard/index.html',
                controller: 'mainMenuController'
            })
            .when('/logout', {
                templateUrl: Config.basePath + '/views/commons/mainMenu.html',
                controller: 'mainMenuController'
            })
            .when('/login', {
                templateUrl: Config.basePath + '/views/commons/mainMenu.html',
                controller: 'mainMenuController'
            });
    }]);