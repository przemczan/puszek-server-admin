angular.module('puszekApp')
    .controller('notificationsController', function notificationsController($rootScope, $scope, PuszekNotifications, Config, $element) {

        var self = this;

        self.newMessagesStatus = false;
        self.hasNewMessages = function() {
            return self.newMessagesStatus && self.messages.length;
        };

        // toggle messages
        self.trayVisible = false;
        self.toggle = function() {
            self.trayVisible = !self.trayVisible;
            self.newMessagesStatus = false;
            $rootScope.$emit('click', $element.get(0));
        };

        self.messages = PuszekNotifications.getMessages();
        self.isConnected = PuszekNotifications.isConnected;

        // prevent from closing messages when clicking inside them, and close them when clicking outside
        $rootScope.$on('click', function(e, _target) {
            if (!_target || (_target !== $element.get(0) && !$.contains($element.get(0), _target))) {
                self.trayVisible = false;
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
            PuszekNotifications.markAsReadAll();
        };

        PuszekNotifications.on('packet', function(e, _packet) {
            if (!self.trayVisible) {
                self.newMessagesStatus = true;
            }
        });
    });
