angular.module('puszek')
    .factory('PuszekSocketPacketsAggregator', function PuszekSocketPacketsAggregatorFactory($rootScope, PuszekLogger) {

        function PuszekSocketPacketsAggregator(puszekSocket, filterFn) {

            var $self = $(this);

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
                angular.forEach(messages, function (message, key) {
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
                    var accepted = (filterFn || angular.noop)(_packet);
                    if (accepted == undefined || accepted === true) {
                        $self.trigger('packet', [_packet]);

                        if (getMessageIndexById(_packet.data._id) < 0) {
                            messages.push(_packet.data);
                        }

                        $rootScope.$apply();
                    }
                } catch (error) {
                    PuszekLogger.log(error.message, _packet);
                }
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

            puszekSocket.on('packet', onPacket);
            puszekSocket.on('close', onClose);
            puszekSocket.on('open', onOpen);


            /**
             * Public methods
             */

            /**
             *
             * @returns {*}
             */
            this.getSocket = function () {
                return puszekSocket;
            };

            /**
             *
             * @returns {Object}
             */
            this.getMessages = function () {
                return messages;
            };

            /**
             *
             * @param messageIds
             */
            this.markAsRead = function (messageIds) {
                puszekSocket.markAsRead(messageIds);
                var index;
                angular.forEach(messageIds, function (id) {
                    index = getMessageIndexById(id);
                    if (index >= 0) {
                        messages.splice(index, 1);
                    }
                });
            };

            /**
             *
             */
            this.clear = function () {
                var messageIds = [];
                angular.forEach(messages, function (message) {
                    messageIds.push(message._id);
                });
                puszekSocket.markAsRead(messageIds);
                messages.length = 0;
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

            this.connect = puszekSocket.connect;
            this.disconnect = puszekSocket.disconnect;
            this.configure = puszekSocket.configure;
            this.isConnected = puszekSocket.isConnected;
        }

        return {
            create: function(_puszekSocket, _filterFn) {
                return new PuszekSocketPacketsAggregator(_puszekSocket, _filterFn);
            }
        };
    });
