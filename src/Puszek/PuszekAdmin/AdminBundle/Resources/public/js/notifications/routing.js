angular.module('puszekApp')
    .config(function($stateProvider, Config) {

        $stateProvider
            .state('notifications', {
                url: '/notifications',
                views: {
                    contentHeader: { template: 'Notifications' },
                    content: {
                        controller: 'notificationsSenderController',
                        templateUrl: Config.basePath + '/views/notifications/index.html'
                    }
                },
                data: {
                    access: {
                        all: ['ROLE_ADMIN']
                    }
                }
            });
    });
