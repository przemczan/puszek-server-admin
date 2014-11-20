angular.module('puszekApp')
    .factory('RestApi', function RestApiFactory(Config, Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(Config.baseUrl + '/api');
        });
    })
    .config(function(RestangularProvider) {
        // add a response intereceptor
        //RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        //    var extractedData;
        //    // .. to look for getList operations
        //    if (operation === "getList") {
        //        // .. and handle the data and meta data
        //        extractedData = data.data.data;
        //        extractedData.meta = data.data.meta;
        //    } else {
        //        extractedData = data.data;
        //    }
        //    return extractedData;
        //});
    });
