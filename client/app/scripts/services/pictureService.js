(function() {
    'use strict';

    angular
        .module('LucidAerials')
        .service('pictureService', PictureService);

    PictureService.$inject = ['$resource', '$http'];

    function PictureService($resource, $http) {
        //var resource = $resource('/data/pictures.json');
        // var req = {
        //     method: 'GET',
        //     url: 'http://api.zenfolio.com/api/1.8/zfapi.asmx',
        //     headers: {
        //         // 'Host': 'api.zenfolio.com',
        //         // 'User-Agent': 'Acme PhotoEdit plugin for Zenfolio',
        //         'Content-Type': 'application/json'
        //     },
        //     data: {
        //         'method': 'LoadPhoto',
        //         'params': [Edi2Uo6_Kv3hFhK9gRg1sZw9b3LEUUwGwpcmI8b-b6o=, 'Level2'],
        //         'id': 1
        //     }
        // }

        return {
            getPictures: function() {
                //return resource.query().$promise;
                return $http(req);
            }
        };
    }
})();
