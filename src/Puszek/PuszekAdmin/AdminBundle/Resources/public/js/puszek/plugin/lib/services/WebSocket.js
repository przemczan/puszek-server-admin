(function(window, $) {
    window.Puszek.WebSocket = function (configuration) {

        var $self = $(this), // jquery version of this
            self = this, // this ;)
            socket, // WebSocket instance
            socketUrl,
            settings = configuration,
            reconnectTries = settings.autoReconnectRetries;

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
         * @param message
         */
        function onMessage(message) {
            $self.trigger('message', [message]);
        }

        /**
         * Initialize socket
         */
        function initializeSocket() {
            socket = new WebSocket(socketUrl);
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
            socketUrl = url || socketUrl;

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
    };
})(window, jQuery);
