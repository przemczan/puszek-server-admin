angular.module('puszekApp')
    .factory('httpErrorInterceptor', function errorInterceptorFactory($q, $injector) {

        return {
            'request': function(config) {
                return config;
            },

            'requestError': function(rejection) {
                return $q.reject(rejection);
            },

            'response': function(response) {
                return response;
            },

            'responseError': function(rejection) {
                $injector.get('Notification').error({
                    message: 'An error occured [' + rejection.status + ': ' + rejection.statusText + ']'
                });
                return $q.reject(rejection);
            }
        };
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('httpErrorInterceptor');
    });
