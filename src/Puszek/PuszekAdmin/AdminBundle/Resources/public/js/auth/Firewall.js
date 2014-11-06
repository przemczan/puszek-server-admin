angular.module('puszekApp')
    .run(function($rootScope, $state, AuthUser, $log) {

        /**
         * @param _access
         */
        function authorize(_access) {
            _access = $.extend(true, { all: false, any: false }, _access);
            var result;

            if (angular.isArray(_access.all)) {
                result = { errorsCount: 0 };
                angular.forEach(_access.all, function(_value) {
                    if (!AuthUser.hasRole(_value)) {
                        this.errorsCount++;
                    }
                }, result);

                if (result.errorsCount) {
                    return false;
                }
            }

            if (angular.isArray(_access.any)) {
                result = { validCount: 0 };
                angular.forEach(_access.any, function(_value) {
                    if (AuthUser.hasRole(_value)) {
                        this.validCount++;
                    }
                }, result);

                if (!result.validCount) {
                    return false;
                }
            }

            if (typeof _access.loggedIn == 'boolean') {
                if (_access.loggedIn != AuthUser.isLoggedIn()) {
                    return false;
                }
            }

            return true;
        }

        /**
         * on state change
         */
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (!authorize(toState.data ? toState.data.access || {} : {})) {
                event.preventDefault();
                $log.log('state not authorized:', toState);
                if (!AuthUser.isLoaded() && fromState.url === '^') {
                    $log.log('user not loaded, saving state');
                    AuthUser.onLoad = function() {
                        $log.log('user loaded, going to:', toState.name);
                        $state.go(toState.name);
                    };
                } else {
                    $log.log('logged in status:', AuthUser.isLoggedIn());
                    if (AuthUser.isLoggedIn())
                        $state.go('homepage');
                    else {
                        $state.go('auth_login');
                    }
                }
            }
        });
    });
