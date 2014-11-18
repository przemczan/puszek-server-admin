angular.module('puszekApp')
    .controller('puszekController', function($scope, PuszekService, Config, $element) {

        var self = this;

        // toggle messages
        self.messagesVisible = false;
        self.toggle = function() {
            self.messagesVisible = !self.messagesVisible;
        };

        // prevent from closing messages when clicking inside them
        $scope.$on('click', function(e, $event) {
            if (!$.contains($element.get(0), $event.target)) {
                self.messagesVisible = false;
                $scope.$apply();
            }
        });

        // configure puszek messages
        PuszekService.configure({
            address: Config.puszekSocketAddress
        });
        PuszekService.on('message', function(e, _message) {
            try {
                _message.message = JSON.parse(_message.message);
            } catch (error) {}
        });
        PuszekService.connect();

        self.messages = PuszekService.getMessages();

        /**
         * Mark message as read
         * @param message
         */
        self.markAsRead = function(message) {
            PuszekService.markAsRead([message.token]);
        };

        /**
         * Remove all messages
         */
        self.clear = function() {
            PuszekService.clear();
        };
    });
