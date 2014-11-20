angular.module('puszek')
    .factory('PuszekLogger', function($log) {
        return {
            log: function() {
                var args = [].slice.call(arguments);
                args.unshift('Puszek:');
                return $log.log.apply($log, args);
            }
        };
    });
