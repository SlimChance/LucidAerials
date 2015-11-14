(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .service('pictureService', PictureService);

    PictureService.$inject = ['$resource'];

    function PictureService($resource) {
        var resource = $resource('/data/pictures.json');

        return {
            getPictures: function() {
                return resource.query().$promise;
            }
        };
    }
})();
