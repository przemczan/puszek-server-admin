angular.module('puszekApp')
    .config(function($stateProvider, Config) {

        $stateProvider
            .state('messages', {
                url: '/messages',
                views: {
                    contentHeader: { template: 'Messages' },
                    content: {
                        controller: 'messagesController',
                        templateUrl: Config.basePath + '/views/messages/list.html'
                    }
                },
                data: {
                    access: {
                        all: ['ROLE_ADMIN']
                    }
                }
            });
    });
