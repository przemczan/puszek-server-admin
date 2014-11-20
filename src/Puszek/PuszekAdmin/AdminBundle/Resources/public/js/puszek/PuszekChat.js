angular.module('puszekApp')
    .factory('PuszekChat', function PuszekChatFactory(PuszekSocketFilter, Config, $log) {

        /**
         * Chats list
         * @type {Array}
         */
        var chats = [];

        /**
         * Chat object
         * @param _config
         * @constructor
         */
        function Chat(_config) {

            /**
             * Configuration
             */
            var config = $.extend(true, {
                    address: null,
                    chatWith: []
                }, _config);

            /**
             * Puszek socket
             * @type {Window.Puszek.Socket}
             */
            var socket = new Puszek.Socket({
                address: config.address,
                packetFilter: function(_packet) {
                    if ('message' == _packet.type) {
                        try {
                            _packet.data.message = JSON.parse(_packet.data.message);
                        } catch (e) {
                            $log.error('Error parsing puszek message:', e);
                            return false;
                        }
                        // TODO filter packets
                        if ('chat' == _packet.data.message.type
                            && config.chatWith.indexOf(_packet.data.message.sender) >= 0
                        ) {
                            return true;
                        }
                    }

                    return false;
                }
            });

            /**
             * Socket packts filter
             * @type {socket}
             */
            var socketFilter = PuszekSocketFilter.create(socket);

            this.send = function(_message) {
                // TODO send chat message
            };

            this.getMessages = socketFilter.getMessages;
            this.clear = socketFilter.clear;
            this.getChatWith = function() {
                return config.chatWith.join(', ');
            };
        }


        return {
            /**
             *
             * @param _config
             * @returns {PuszekChatFactory.Chat}
             */
            create: function(_config) {
                var chat = new Chat(_config);
                chats.push(chat);

                return chat;
            },

            getChats: function() {
                return chats;
            }
        };
    });