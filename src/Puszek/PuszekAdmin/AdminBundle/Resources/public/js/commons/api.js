angular.module('puszekApp')
    .factory('RestApi', function (Config, Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(Config.baseUrl + '/api');
        });
    });
