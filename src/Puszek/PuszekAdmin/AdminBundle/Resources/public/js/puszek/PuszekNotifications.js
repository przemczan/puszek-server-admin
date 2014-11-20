angular.module('puszekApp')
    .factory('PuszekNotifications', function PuszekNotificationsFactory(PuszekSocketFilter, Config, $log) {

        var socket = new Puszek.Socket({
            address: Config.puszekNotificationsSocketAddress,
            packetFilter: function(_packet) {
                if ('message' == _packet.type) {
                    try {
                        _packet.data.message = JSON.parse(_packet.data.message);
                        if ('notification' == _packet.data.message.type) {
                            return true;
                        }
                    } catch (e) {
                        $log.error('Error parsing puszek message:', e);
                    }
                }

                return false;
            }
        });

        return PuszekSocketFilter.create(socket);
    });