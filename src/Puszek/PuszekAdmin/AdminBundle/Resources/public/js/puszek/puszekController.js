angular.module('puszekApp')
    .controller('puszekController', function($scope, NotificationsProvider, Config, $element) {

        var self = this;

        self.newMessagesStatus = false;
        self.hasNewMessages = function() {
            return self.newMessagesStatus && self.messages.length;
        };

        // toggle messages
        self.messagesVisible = false;
        self.toggle = function() {
            self.messagesVisible = !self.messagesVisible;
            self.newMessagesStatus = false;
        };

        self.messages = NotificationsProvider.getMessages();
        self.isConnected = NotificationsProvider.isConnected;

        // prevent from closing messages when clicking inside them
        $scope.$on('click', function(e, $event) {
            if (!$.contains($element.get(0), $event.target)) {
                self.messagesVisible = false;
                $scope.$apply();
            }
        });

        /**
         * Mark message as read
         * @param _message
         */
        self.markAsRead = function(_message) {
            NotificationsProvider.markAsRead([_message._id]);
        };

        /**
         * Remove all messages
         */
        self.clear = function() {
            NotificationsProvider.clear();
        };

        NotificationsProvider.on('packet', function(e, _packet) {
            self.newMessagesStatus = true;
        });
    })
    .run(function($rootScope, NotificationsProvider) {

        var $scope = $rootScope.$new();

        // catch login/logout events
        $scope.$on('auth.login', function() {
            NotificationsProvider.connect();
        });
        $scope.$on('auth.logout', function() {
            NotificationsProvider.disconnect();
        });
    });
