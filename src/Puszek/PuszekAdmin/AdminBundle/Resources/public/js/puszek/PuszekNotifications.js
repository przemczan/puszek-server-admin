angular.module('puszekApp')
    .factory('PuszekNotifications', function PuszekNotificationsFactory(PuszekSocketPacketsAggregator, PuszekSocket) {
        return PuszekSocketPacketsAggregator.create(PuszekSocket, function(_packet) {
            if ('message' == _packet.type) {
                try {
                    if ('notification' == _packet.data.message.type) {
                        return true;
                    }
                } catch (e) {
                    $log.error('Error parsing puszek message:', e);
                }
            }

            return false;
        });
    });
