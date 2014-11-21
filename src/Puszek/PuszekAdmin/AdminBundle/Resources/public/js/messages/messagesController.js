angular.module('puszekApp')
    .controller('messagesController', function messagesController($scope, $http, Config, AuthUser, PuszekChat, PuszekSocket) {

        $scope.notification = {
            sender: '',
            receivers: '',
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

        $scope.chats = PuszekChat.getChats();

        $scope.getChat = function(_sender, _receiver) {
            var chat = PuszekChat.getChat(_sender, _receiver);
            if (!chat) {
                chat = PuszekChat.create({
                        socket: PuszekSocket,
                        sender: _sender,
                        receiver: _receiver
                    });
            }

            return chat;
        };

        $scope.newChat = {
            sender: AuthUser.getFullName(),
            receiver: AuthUser.getFullName()
        };

        $scope.closeChat = function(_chat) {
            $scope.chats.splice($scope.chats.indexOf(_chat), 1);
        }
    });
