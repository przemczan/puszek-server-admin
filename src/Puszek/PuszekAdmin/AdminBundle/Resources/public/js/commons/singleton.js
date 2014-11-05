angular.module('puszekApp')
    .factory('Singleton', function () {
        var objects = {};

        return {
            get: function(_key, _constructor, _repeater) {
                if (typeof objects[_key] == 'undefined') {
                    objects[_key] = {
                        object: _constructor()
                    };
                } else if (typeof _repeater == 'function') {
                    _repeater(objects[_key].object);
                }

                return objects[_key].object;
            }
        };
    });
