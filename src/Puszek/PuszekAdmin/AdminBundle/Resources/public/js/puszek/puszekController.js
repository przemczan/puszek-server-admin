angular.module('puszekApp')
    .controller('puszekController', function($scope, PuszekNotificationService, Config, $element) {

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

        self.messages = PuszekNotificationService.getMessages();
        self.isConnected = PuszekNotificationService.isConnected;

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
            PuszekNotificationService.markAsRead([_message._id]);
        };

        /**
         * Remove all messages
         */
        self.clear = function() {
            PuszekNotificationService.clear();
        };

        PuszekNotificationService.on('message', function(e, _message) {
            self.newMessagesStatus = true;
        });
    })
    .run(function($rootScope, PuszekNotificationService, Config) {

        var $scope = $rootScope.$new();

        // configure puszek messages
        PuszekNotificationService.configure({
            address: Config.puszekSocketAddress
        });

        // parse custom messages
        PuszekNotificationService.on('message', function(e, _messageEvent) {
            try {
                _messageEvent.message.message = JSON.parse(_messageEvent.message.message);
            } catch (error) {}
        });

        // catch login/logout events
        $scope.$on('auth.login', function() {
            PuszekNotificationService.connect();
        });
        $scope.$on('auth.logout', function() {
            PuszekNotificationService.disconnect();
        });
    });
