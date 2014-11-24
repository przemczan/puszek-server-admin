angular.module('puszekApp')
    .factory('PuszekSocket', function PuszekSocketFactory($rootScope, $log) {
        return new Puszek.Socket({
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
            })
            .on('open, close, error, packet', function() {
                $rootScope.$apply();
            });
    })
    .run(function($rootScope, PuszekSocket, AuthUser) {

        // catch login/logout events
        $rootScope.$on('auth.login', function() {
            if (AuthUser.getData().puszekSocketAddress) {
                PuszekSocket.connect(AuthUser.getData().puszekSocketAddress);
            }
        });
        $rootScope.$on('auth.logout', function() {
            PuszekSocket.disconnect();
        });
    });
