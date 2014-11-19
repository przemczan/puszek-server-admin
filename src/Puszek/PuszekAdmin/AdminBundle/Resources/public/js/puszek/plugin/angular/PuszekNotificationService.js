angular.module('puszek', [])
    .factory('PuszekNotificationServiceLog', function($log) {
        return {
            log: function() {
                var args = [].slice.call(arguments);
                args.unshift('Puszek notification service:');
                return $log.log.apply($log, args);
            }
        };
    })
    .factory('PuszekNotificationService', function($rootScope, PuszekNotificationServiceLog) {

        var $self = $(this);

        /**
         * Puszek connection
         * @type {Window.Puszek}
         */
        var puszek = new Puszek();

        /**
         * Current messages list
         * @type {Object}
         */
        var messages = [];

        /**
         *
         * @param _id
         * @returns {number}
         */
        function getMessageIndexById(_id) {
            return getMessageIndexBy('_id', _id);
        }

        /**
         *
         * @param field
         * @param value
         * @returns {number}
         */
        function getMessageIndexBy(field, value) {
            var index = -1;
            angular.forEach(messages, function(message, key) {
                if (message[field] == value) {
                    index = key;
                }
            });

            return index;
        }

        /**
         * Got message!
         * @asynchronous
         * @param event
         * @param _packet
         */
        function onPacket(event, _packet) {
            try {
                $self.trigger('packet', [_packet]);

                if ('message' == _packet.type) {
                    var messageEvent = {
                            message: _packet.data,
                            ignore: false
                        };

                    // trigger message event
                    $self.trigger('message', [messageEvent]);

                    if (!messageEvent.ignore) {
                        if (getMessageIndexById(_packet.data._id) < 0) {
                            messages.push(_packet.data);
                        }
                    }
                }
            } catch (error) {
                PuszekNotificationServiceLog.log(error.message, _packet);
            }
            $rootScope.$apply();
        }

        /**
         * Oops! an arror occured!
         * Clear messages before reconnect, because we will receive them all again after reconnection (or not).
         * @asynchronous
         */
        function onClose() {
            messages.length = 0;
            $rootScope.$apply();
        }

        /**
         *
         */
        function onOpen() {
            $rootScope.$apply();
        }

        /**
         */
        function on() {
            $self.on.apply($self, arguments);
        }

        /**
         */
        function off() {
            $self.off.apply($self, arguments);
        }

        puszek.on('packet', onPacket);
        puszek.on('close', onClose);
        puszek.on('open', onOpen);

        /**
         * Public object
         * @type {Object}
         */
        return {
            getPuszek: function() {
                return puszek;
            },

            getMessages: function() {
                return messages;
            },

            markAsRead: function(messageIds) {
                puszek.markAsRead(messageIds);
                var index;
                angular.forEach(messageIds, function(id) {
                    index = getMessageIndexById(id);
                    if (index >= 0) {
                        messages.splice(index, 1);
                    }
                });
            },

            clear: function() {
                var messageIds = [];
                angular.forEach(messages, function(message) {
                    messageIds.push(message._id);
                });
                puszek.markAsRead(messageIds);
                messages.length = 0;
            },

            connect: function() {
                puszek.connect();
            },

            disconnect: function() {
                puszek.disconnect();
            },

            configure: puszek.configure,
            isConnected: puszek.isConnected,
            on: on,
            off: off
        };
    });
