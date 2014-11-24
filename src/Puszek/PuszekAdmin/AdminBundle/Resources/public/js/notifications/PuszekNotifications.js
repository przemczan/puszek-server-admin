angular.module('puszekApp')
    .factory('PuszekNotifications', function PuszekNotificationsFactory(PuszekSocketPacketsAggregator, PuszekSocket) {
        return PuszekSocketPacketsAggregator.create(PuszekSocket, function(_packet) {
            return 'message' == _packet.type &&'notification' == _packet.data.message.type && _packet.data.message.message !== '';
        });
    });
