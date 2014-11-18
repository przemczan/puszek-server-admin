(function(window, $) {
    window.Puszek = window.Puszek || new function()
    {
        var $self = $(this),
            self = this,
            reconnectTries = 0;

        /**
         * Socket connector
         * @type {Window.Puszek.WebSocket}
         */
        var socket;

        /**
         * Settings
         * @type {Object}
         */
        var settings = {
            address: 'ws://localhost:5001',
            serverProtocol: null,
            autoReconnectRetries: 1000,
            autoReconnectDelay: 5000
        };

        /**
         * Message handler
         * @param event
         * @param messageEvent
         */
        function onMessage(event, messageEvent) {
            $self.trigger('message', [messageEvent]);
        }

        /**
         * Error handler
         */
        function onError() {
            $self.trigger('error');
        }

        /**
         * Open connection event handler
         */
        function onOpen() {
            $self.trigger('open');
            reconnectTries = settings.autoReconnectRetries;
        }

        /**
         * Close connection event handler
         */
        function onClose() {
            $self.trigger('close');
        }

        /**
         * Event connector
         */
        this.on = function() {
            $self.on.apply($self, arguments);
        };

        /**
         * Event disconnector
         */
        this.off = function() {
            $self.off.apply($self, arguments);
        };

        /**
         * Runs this shit
         */
        this.connect = function() {
            if (socket && socket.readyState < 3) {
                return;
            }

            socket = new window.Puszek.WebSocket({
                autoReconnectRetries: settings.autoReconnectRetries,
                autoReconnectDelay: settings.autoReconnectDelay
            });
            socket.connect(settings.address);
            $(socket).on('open', onOpen);
            $(socket).on('close', onClose);
            $(socket).on('message', onMessage);
            $(socket).on('error', onError);
        };

        /**
         * Configure
         */
        this.configure = function(_configuration) {
            settings = $.extend(true, settings, _configuration);

            return self;
        };

        /**
         * Returns configuration object
         */
        this.getConfiguration = function() {
            return settings;
        };

        /**
         * Disconnects
         */
        this.disconnect = function() {
            if (socket) {
                socket.disconnect();
            }
        };

        /**
         * Reconnects
         */
        this.reconnect = function() {
            if (socket) {
                socket.reconnect();
            }
        };

        /**
         * Connection status
         */
        this.isConnected = function() {
            return socket && socket.isConnected();
        };

        /**
         *
         * @param messageIds
         */
        this.markAsRead = function(messageIds) {
            if (socket) {
                //socket.send('markReaded:' + messageIds.join(','));
            }
        };
    };
})(window, jQuery);
