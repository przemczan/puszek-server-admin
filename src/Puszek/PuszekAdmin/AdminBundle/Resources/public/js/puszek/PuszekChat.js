angular.module('puszekApp')
    .factory('PuszekChat', function PuszekChatFactory($rootScope, PuszekSocketPacketsAggregator, Config, $log, $http, AuthUser) {

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
             * @var {{socket:{Puszek.Socket}}}
             */
            var config = $.extend(true, {
                    socket: null,
                    receiver: '',
                    sender: ''
                }, _config);

            /**
             * Socket packets aggregator
             * @type {Puszek.Socket}
             */
            var socketPacketAggregator;

            /**
             *
             * @param _message
             */
            this.send = function(_message) {
                $http.post(Config.baseUrl + '/messages/send', {
                    sender: config.sender || AuthUser.getFullName(),
                    receivers: [config.receiver, AuthUser.getFullName()],
                    message: {
                        type: 'chat',
                        message: _message
                    }
                });
            };

            socketPacketAggregator = PuszekSocketPacketsAggregator.create(config.socket, function onPacket(_packet) {
                return 'message' == _packet.type &&'chat' == _packet.data.message.type && config.receiver === _packet.data.sender;

            });

            this.getMessages = socketPacketAggregator.getMessages;
            this.clear = socketPacketAggregator.clear;
            this.open = socketPacketAggregator.connect;
            this.close = socketPacketAggregator.disconnect;

            this.getReceiver = function() {
                return config.receiver;
            };
            this.getSender = function() {
                return config.sender;
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
            },

            getChat: function(_sender, _receiver) {
                var chat = false;
                angular.forEach(chats, function(_chat) {
                    if (_chat.getSender() == _sender && _chat.getReceiver() == _receiver) {
                        chat = _chat;
                    }
                });

                return chat;
            }
        };
    });
