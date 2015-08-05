'use strict';

lucidAerials.service('pictureService', function($resource) {
    var resource = $resource('/data/pictures.json');

    return {
        getPictures: function() {
            return resource.query();
        }
    }
});
