angular.module('puszekApp')
    .factory('AuthUser', function AuthUserFactory($rootScope, Config, $state, $http, $log, $stateParams) {

        var emptyUser = {
                user: false,
                roles: [],
                isLoaded: false,
                data: null
            },
            userData = {},
            systemRoles = [];

        /**
         * Gather all used roles in all states
         */
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

            return $http.post(Config.baseUrl + '/auth/me', {
                    roles: systemRoles
                })
                .success(function (_data) {
                    $log.log('me response:', _data);
                    if (angular.isObject(_data)) {
                        userData.user = _data.user || false;
                        userData.roles = _data.roles || [];
                        userData.data = _data.data || null;
                    }
                    userData.isLoaded = true;
                    $service.trigger('load');
                    if ($state.current.name !== '') {
                        $state.transitionTo($state.current.name, $stateParams, {
                            reload: true, inherit: false, notify: true
                        });
                    }
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
                    return reload();
                },

                on: function() {
                    return $service.on.apply($service, arguments);
                },

                one: function() {
                    return $service.one.apply($service, arguments);
                },

                off: function() {
                    return $service.off.apply($service, arguments);
                },

                getData: function() {
                    return userData.data;
                }
            },
            $service = $(service);

        return service;
    });
