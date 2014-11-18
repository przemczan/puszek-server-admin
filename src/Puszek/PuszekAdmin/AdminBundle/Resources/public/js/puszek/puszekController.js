angular.module('puszekApp')
    .controller('puszekController', function($scope, PuszekService, Config, $element) {

        var self = this;

        // toggle messages
        self.messagesVisible = false;
        self.toggle = function() {
            self.messagesVisible = !self.messagesVisible;
        };

        self.messages = PuszekService.getMessages();
        self.isConnected = PuszekService.isConnected;

        // prevent from closing messages when clicking inside them
        $scope.$on('click', function(e, $event) {
            if (!$.contains($element.get(0), $event.target)) {
                self.messagesVisible = false;
                $scope.$apply();
            }
        });

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
    })
    .run(function($rootScope, PuszekService, Config) {

        var $scope = $rootScope.$new();

        // configure puszek messages
        PuszekService.configure({
            address: Config.puszekSocketAddress
        });

        // parse messages
        PuszekService.on('message', function(e, _message) {
            try {
                _message.message = JSON.parse(_message.message);
            } catch (error) {}
        });

        // catch login/logout events
        $scope.$on('auth.login', function() {
            PuszekService.connect();
        });
        $scope.$on('auth.logout', function() {
            PuszekService.disconnect();
        });
    });
