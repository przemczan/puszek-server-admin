angular.module('puszekApp')
    .factory('PuszekChat', function PuszekChatFactory($rootScope, PrzemczanPuszekMessageChannel, Config, $log, $http, AuthUser) {

        /**
         * Chats list
         * @type {Array}
         */
        var chats = [];

        /**
         *
         * @type {string}
         */
        var broadcast = '*';

        /**
         * Chat object
         * @param _config
         * @constructor
         */
        function Chat(_config) {

            $log.info('Puszek chat:', _config);

            /**
             * @var {{socket:{Puszek.Socket}}}
             */
            var config = {
                    socket: null,
                    receiver: '',
                    sender: '',
                    http: {}
                };

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
                $http.post(
                    Config.baseUrl + '/messages/send',
                    {
                        sender: config.sender || AuthUser.getFullName(),
                        receivers: [config.receiver, AuthUser.getFullName()],
                        message: {
                            type: 'chat',
                            message: _message
                        }
                    },
                    config.http
                );
            };

            this.configure = function(_config) {
                config = $.extend(true, config, _config);
            };

            this.configure(_config);

            socketPacketAggregator = PrzemczanPuszekMessageChannel.create(config.socket, function onPacket(_packet) {
                return (
                    'message' == _packet.type &&'chat' == _packet.data.message.type
                    && (
                        config.sender === _packet.data.sender &&_packet.data.receivers.indexOf(config.receiver) >= 0    // from myself
                        || config.receiver === _packet.data.sender &&_packet.data.receivers.indexOf(config.sender) >= 0 // from receiver
                        || config.receiver === broadcast &&_packet.data.receivers.indexOf(broadcast) >= 0 // from broadcast
                    )
                );
            });

            this.getMessages = socketPacketAggregator.getMessages;
            this.clear = socketPacketAggregator.markAllAsRead;
            this.open = socketPacketAggregator.connect;
            this.close = socketPacketAggregator.disconnect;
            this.on = socketPacketAggregator.on;
            this.off = socketPacketAggregator.off;
            this.isConnected = socketPacketAggregator.isConnected;

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

            setBroadcast: function(_broadcast) {
                broadcast = _broadcast;;
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
