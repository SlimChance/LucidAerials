'use strict';

function PictureService($resource, $http) {
    'ngInject';
    //var resource = $resource('/data/pictures.json');
    var req = {
        method: 'GET',
        url: 'http://api.zenfolio.com/api/1.8/zfapi.asmx/LoadPhoto?photoId=327977501&level=Level2',
        headers: {
            'Host': 'api.zenfolio.com',
            // 'User-Agent': 'Acme PhotoEdit plugin for Zenfolio v1.0',
            // 'Cookie': 'zf_ua=Acme%20PhotoEdit%20plugin%20for%20Zenfolio%20v1.0',
            // 'Content-Type': 'application/json'
        },
        // data: {
        //     'method': 'LoadPhoto',
        //     'params': [327977501, 'Level2']
        // }
    }

    return {
        getPictures: function() {
            //return resource.query().$promise;
            return $http(req);
        }
    };
}

module.exports = PictureService;
