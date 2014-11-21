angular.module('puszekApp')
    .factory('PuszekSocket', function PuszekSocketFactory($rootScope, $log) {
        return new Puszek.Socket({
                address: null // to be updated later
            })
            .on('pre.packet', function(e, _packet) {
                try {
                    _packet.data.message = JSON.parse(_packet.data.message);
                } catch (e) {
                    $log.error('PuszekSocket:', e, _packet);
                }
            })
            .on('open, close, error, packet', function() {
                $rootScope.$apply();
            });
    })
    .run(function($rootScope, PuszekSocket, AuthUser) {

        var $scope = $rootScope.$new();

        // catch login/logout events
        $scope.$on('auth.login', function() {
            if (AuthUser.getData().puszekSocketAddress) {
                PuszekSocket.connect(AuthUser.getData().puszekSocketAddress);
            }
        });
        $scope.$on('auth.logout', function() {
            PuszekSocket.disconnect();
        });
    });
