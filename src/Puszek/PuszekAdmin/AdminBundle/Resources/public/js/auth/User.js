angular.module('puszekApp')
    .factory('AuthUser', function(Config, $state, $http, $log) {

        var emptyUser = {
                user: false,
                roles: [],
                isLoaded: false
            },
            userData = {},
            systemRoles = [];

        angular.forEach($state.get(), function (_state) {
            if (_state.data && _state.data.access) {
                if (angular.isArray(_state.data.access.all)) {
                    systemRoles = systemRoles.concat(_state.data.access.all);
                }
                if (angular.isArray(_state.data.access.any)) {
                    systemRoles = systemRoles.concat(_state.data.access.any);
                }
            }
        });

        /**
         * Raload current user
         */
        function reload() {
            angular.copy(emptyUser, userData);
            userData.isLoaded = false;

            $http.post(Config.baseUrl + '/auth/me', {
                    roles: systemRoles
                })
                .success(function (_data) {
                    $log.log('me response:', _data);
                    if (angular.isObject(_data)) {
                        userData.user = _data.user || false;
                        userData.roles = _data.roles || [];
                    }
                    userData.isLoaded = true;
                    (service.onLoad || angular.noop)();
                })
                .error(function() {
                    $log.log('me error:', arguments);
                });
        }

        reload();

        var service = {
            isLoggedIn: function() {
                return !!userData.user;
            },

            getFullName: function() {
                return userData.user ? userData.user.fullName : '';
            },

            hasRole: function(_role) {
                return !!userData.roles[_role];
            },

            isLoaded: function() {
                return userData.isLoaded;
            },

            reload: function() {
                reload();
            },

            onLoad: null
        };

        return service;
    });
