angular.module('puszekApp')
    .factory('PuszekMessagesSocket', function PuszekMessagesSocketFactory($rootScope, $log, PrzemczanPuszekSocket) {

        return PrzemczanPuszekSocket.create({
                address: null // to be updated later
            })
            .on('pre.packet', function(e, _packet) {
                if ('message' == _packet.type) {
                    try {
                        _packet.data.message = JSON.parse(_packet.data.message);
                    } catch (e) {
                        $log.error('PuszekSocket:', e, _packet);
                    }
                }
            });
    })
    .run(function($rootScope, PuszekMessagesSocket, AuthUser) {

        // catch login/logout events
        $rootScope.$on('auth.login', function() {
            if (AuthUser.getData().puszekSocketAddress) {
                PuszekMessagesSocket.connect(AuthUser.getData().puszekSocketAddress);
            }
        });
        $rootScope.$on('auth.logout', function() {
            PuszekMessagesSocket.disconnect();
        });
    });
