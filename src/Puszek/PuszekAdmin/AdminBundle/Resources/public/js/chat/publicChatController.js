angular.module('puszekApp')
    .controller('publicChatController', function publicChatController($rootScope, $scope, Singleton, AuthUser, PuszekMessagesSocket, PuszekChat, Config, $element) {

        var self = this;

        self.chat = Singleton.define('chat.public', function() {
                return {
                    object: PuszekChat.create({
                        socket: PuszekMessagesSocket,
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
            $scope.$emit('click', $element.get(0));
        };

        self.message = '';

        // prevent from closing messages when clicking inside them, and close them when clicking outside
        $rootScope.$on('click', function(e, _target) {
            if (!_target || (_target !== $element.get(0) && !$.contains($element.get(0), _target))) {
                self.trayVisible = false;
            }
        });

        self.sendMessage = function($event) {
            if (self.message && (!$event || $event.keyCode == 13)) {
                self.chat.send(self.message);
                self.message = '';
            }
        };

        self.clear = function() {
            self.chat.clear();
        };

        function scrollToLastMessage() {
            var container = $('.messages', $element.get(0));
            container.stop().animate({ scrollTop: container.get(0).scrollHeight }, 500);
        }

        self.chat.on('packet', function(e, _packet) {
            if (!self.trayVisible) {
                self.newMessagesStatus = true;
            }
            scrollToLastMessage();
        });
    })
    .run(function($rootScope, Singleton, PuszekMessagesSocket, AuthUser) {

        // catch login/logout events
        $rootScope.$on('auth.login', function() {
            if (Singleton.has('chat.public')) {
                Singleton.get('chat.public').configure({sender: AuthUser.getFullName()});
            }
        });
    });
