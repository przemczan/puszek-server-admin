angular.module('puszekApp')
    .factory('RestApiCRUDFactoryGUI', function(RestApi, CRUDFactoryGUI) {
        return {
            create: function(_config) {
                _config.restangular = RestApi;
                return CRUDFactoryGUI.create(_config);
            }
        };
    });
