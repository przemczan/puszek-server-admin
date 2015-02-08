angular.module('puszekApp')
    .factory('PuszekNotifications', function PuszekNotificationsFactory(PrzemczanPuszekMessageChannel, PuszekMessagesSocket) {
        return PrzemczanPuszekMessageChannel.create(PuszekMessagesSocket, function(_packet) {
            return 'message' == _packet.type &&'notification' == _packet.data.message.type && _packet.data.message.message !== '';
        });
    });
