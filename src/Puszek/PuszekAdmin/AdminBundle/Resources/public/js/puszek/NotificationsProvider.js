angular.module('puszekApp')
    .factory('NotificationsProvider', function(PuszekPacketSource, Config) {

        var socket = new Puszek.Socket({
            address: Config.puszekNotificationsSocketAddress,
            packetFilter: function(_packet) {
                console.log(_packet);
            }
        });

        return PuszekPacketSource.create(socket);
    })
    .run(function($rootScope, NotificationsProvider) {
        NotificationsProvider.on('packet', function(e, _packet) {

        });
    });
