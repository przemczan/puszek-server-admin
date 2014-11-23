angular.module('puszekApp')
    .controller('publicChatController', function publicChatController($scope, Singleton, AuthUser, PuszekSocket, PuszekChat, Config, $element) {

        var self = this;

        self.chat = Singleton.define('chat.public', function() {
                return {
                    object: PuszekChat.create({
                        socket: PuszekSocket,
                        sender: AuthUser.getFullName(),
                        receiver: '*',
                        http: {
                            loaderId: 'publicChat'
                        }
                    })
                };
            })
            .get('chat.public');

        self.newMessagesStatus = false;
        self.hasNewMessages = function() {
            return self.newMessagesStatus && self.chat.getMessages().length;
        };

        // toggle messages
        self.trayVisible = false;
        self.toggle = function() {
            self.trayVisible = !self.trayVisible;
            self.newMessagesStatus = false;
            setTimeout(scrollToLastMessage, 1);
        };

        self.message = '';

        // prevent from closing messages when clicking inside them
        $scope.$on('click', function(e, $event) {
            if (!$.contains($element.get(0), $event.target)) {
                self.trayVisible = false;
                $scope.$apply();
            }
        });

        self.sendMessage = function($event) {
            if (self.message && (!$event || $event.keyCode == 13)) {
                self.chat.send(self.message);
                self.message = '';
            }
        };

        function scrollToLastMessage() {
            var container = $('.messages', $element.get(0));
            container.stop().animate({ scrollTop: container.get(0).scrollHeight }, 500);
        }

        self.chat.on('packet', function(e, _packet) {
            self.newMessagesStatus = true;
            scrollToLastMessage();
        });
    })
    .run(function($rootScope, Singleton, PuszekSocket, AuthUser) {

        // catch login/logout events
        $rootScope.$on('auth.login', function() {
            if (Singleton.has('chat.public')) {
                Singleton.get('chat.public').configure({sender: AuthUser.getFullName()});
            }
        });
    });
