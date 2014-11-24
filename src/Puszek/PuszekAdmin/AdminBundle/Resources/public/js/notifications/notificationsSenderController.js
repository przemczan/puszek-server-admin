angular.module('puszekApp')
    .controller('notificationsSenderController', function notificationsSenderController($scope, $http, Config, AuthUser) {

        $scope.notification = {
            sender: AuthUser.getFullName(),
            receivers: '*',
            message: {
                type: 'notification',
                message: ''
            }
        };

        $scope.sendNotification = function() {
            $http.post(Config.baseUrl + '/messages/send', $scope.notification).then(function() {
                $scope.notification.message.message = '';
            });
        };
    });
