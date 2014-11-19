(function(window, $) {
    window.Puszek = window.Puszek || function()
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
         * @param _messageEvent
         */
        function onMessage(event, _messageEvent) {
            try {
                $self.trigger('packet', [JSON.parse(_messageEvent.data)]);
            } catch (e) {}
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
                self.WebSocketRequest.create()
                    .type(self.WebSocketRequest.TYPE_MESSAGE_MARK_AS_READ)
                    .data(self.WebSocketRequest.MessageIdList.create().ids(messageIds).get())
                    .send(socket)
            }
        };
    };
})(window, jQuery);
