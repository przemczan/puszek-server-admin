angular.module('puszek', [])
    .factory('PuszekServiceLog', function($log) {
        return {
            log: function() {
                var args = [].slice.call(arguments);
                args.unshift('Puszek:');
                return $log.log.apply($log, args);
            }
        };
    })
    .factory('PuszekService', function($rootScope, PuszekServiceLog) {

        var $self = $(this);

        /**
         * Current messages list
         * @type {Object}
         */
        var messages = [];

        /**
         *
         * @param _token
         * @returns {number}
         */
        function getMessageIndexByToken(_token) {
            return getMessageIndexBy('_token', _token);
        }

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
         * @param messageEvent
         */
        function onMessage(event, messageEvent) {
            try {
                PuszekServiceLog.log('Response received', messageEvent);
                var response = JSON.parse(messageEvent.data);
                PuszekServiceLog.log('Response parsed', response);

                if ('message' == response.type) {
                    var message = response.data,
                        messageIndex = getMessageIndexById(message._id);

                    if (messageIndex < 0) {
                        $self.trigger('message', [message]);
                        messages.push(message);
                    }
                } else {
                    $self.trigger('packet', [response]);
                }
            } catch (error) {
                PuszekServiceLog.log(error.message, messageEvent);
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

        Puszek.on('message', onMessage);
        Puszek.on('close', onClose);
        Puszek.on('open', onOpen);

        /**
         * Public object
         * @type {Object}
         */
        var Service = {
            getPuszek: function() {
                return Puszek;
            },

            getMessages: function() {
                return messages;
            },

            markAsRead: function(messageIds) {
                Puszek.markAsRead(messageIds);
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
                Puszek.markAsRead(messageIds);
                messages.length = 0;
            },

            connect: function() {
                Puszek.connect();
            },

            disconnect: function() {
                Puszek.disconnect();
            },

            configure: Puszek.configure,
            isConnected: Puszek.isConnected,
            on: on,
            off: off
        };


        return Service;
    });
