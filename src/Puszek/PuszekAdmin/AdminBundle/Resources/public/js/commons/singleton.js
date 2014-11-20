angular.module('puszekApp')
    .factory('Singleton', function SingletonFactory($rootScope) {
        var objects = {},
            $scope = $rootScope.$new();

        return {
            get: function(_key, _constructor) {

                if (typeof objects[_key] == 'undefined') {
                    objects[_key] = _constructor();
                    if (objects[_key].removeOnLogout || true) {
                        $scope.$on('auth.logout', function() {
                            delete objects[_key];
                        });
                    }
                }

                return objects[_key].object;
            }
        };
    });
