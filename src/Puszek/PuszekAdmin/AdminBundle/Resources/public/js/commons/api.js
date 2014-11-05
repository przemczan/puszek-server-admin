angular.module('puszekApp')
    .factory('RestApi', function (Config, Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(Config.baseUrl + '/api');
        });
    })
    .factory('RestApiMe', function (RestApi) {
        return RestApi.one('users', 'me');
    });
