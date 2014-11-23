angular.module('puszekApp')
    .controller('notificationsController', function notificationsController($rootScope, $scope, PuszekNotifications, Config, $element) {

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

        self.messages = PuszekNotifications.getMessages();
        self.isConnected = PuszekNotifications.isConnected;

        // prevent from closing messages when clicking inside them
        $rootScope.$on('click', function(e, $event) {
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
            PuszekNotifications.markAsRead([_message._id]);
        };

        /**
         * Remove all messages
         */
        self.clear = function() {
            PuszekNotifications.clear();
        };

        PuszekNotifications.on('packet', function(e, _packet) {
            self.newMessagesStatus = true;
        });
    });
