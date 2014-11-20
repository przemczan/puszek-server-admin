(function(window, $) {
    window.Puszek.Socket = function (_config) {

        var $self = $(this), // jquery version of this
            self = this, // this ;)
            socket, // WebSocket instance
            noop = function(){},
            settings = {
                address: 'ws://localhost:5001',
                serverProtocol: null,
                autoReconnectRetries: 1000,
                autoReconnectDelay: 5000,
                packetFilter: noop
            },
            reconnectTries = settings.autoReconnectRetries;

        /**
         * Configure
         */
        this.configure = function(_config) {
            settings = $.extend(true, settings, _config);

            return self;
        };

        /**
         * Returns configuration object
         */
        this.getConfiguration = function() {
            return settings;
        };

        /**
         * Socket connection opened
         */
        function onOpen() {
            reconnectTries = settings.autoReconnectRetries;
            $self.trigger('open');
        }

        /**
         * Socket connection opened
         */
        function onClose() {
            $self.trigger('close');

            if (socket && settings.autoReconnectRetries > 0) {
                if (reconnectTries--) {
                    setTimeout(
                        function() {
                            self.reconnect();
                        },
                        settings.autoReconnectDelay
                    );
                } else {
                    reconnectTries = settings.autoReconnectRetries;
                }
            }
        }

        /**
         * Socket connection opened
         */
        function onError() {
            $self.trigger('error');
        }

        /**
         * Message received callback
         * @param _message
         */
        function onMessage(_message) {
            try {
                var packet = JSON.parse(_message.data),
                    accepted = (settings.packetFilter || noop)(packet);

                if (typeof accepted == 'undefined' || accepted === true) {
                    $self.trigger('packet', [packet]);
                }
            } catch (e) {}
        }

        /**
         * Initialize socket
         */
        function initializeSocket() {
            socket = new WebSocket(settings.address);
            socket.onerror = onError;
            socket.onopen = onOpen;
            socket.onclose = onClose;
            socket.onmessage = onMessage;
        }

        /**
         * socket connect
         * @param url
         */
        this.connect = function (url) {
            settings.address = url || settings.address;

            initializeSocket();
        };

        /**
         * socket disconnect
         */
        this.disconnect = function () {
            if (socket) {
                var oldSocket = socket;
                socket = false;
                oldSocket.close();
                oldSocket = null;
            }
        };

        /**
         * socket reconnect
         */
        this.reconnect = function () {
            self.disconnect();
            self.connect();
        };

        /**
         * socket connection status
         */
        this.isConnected = function () {
            return socket && socket.readyState == 1;
        };

        /**
         * Send data
         * @param data
         */
        this.send = function (data) {
            if (socket && socket.readyState == 1) {
                socket.send(data);
            }
        };

        /**
         *
         * @param messageIds
         */
        this.markAsRead = function(messageIds) {
            if (socket) {
                Puszek.SocketRequest.create()
                    .type(Puszek.SocketRequest.TYPE_MESSAGE_MARK_AS_READ)
                    .data(Puszek.SocketRequest.MessageIdList.create().ids(messageIds).get())
                    .send(socket)
            }
        };

        /**
         */
        this.on = function() {
            $self.on.apply($self, arguments);
        };

        /**
         */
        this.off = function() {
            $self.off.apply($self, arguments);
        };


        _config && this.configure(_config);
    };
})(window, jQuery);
