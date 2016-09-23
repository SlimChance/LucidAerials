'use strict';

function PictureService($resource, $soap, jsonrpc) {
    'ngInject';
    var apiUrl = 'http://cors.io/?u=http://api.zenfolio.com/api/1.8/zfapi.asmx';

    //http://cors.io/?u=

    //     url: 'http://api.zenfolio.com/api/1.8/zfapi.asmx/LoadPhotoSet?photoSetId=908453492&level=2&includePhotos=true',

    return {
        // getPhotoSet: function(photoSetId, level, includePhotos) {
        //     return $soap.post(apiUrl, 'LoadPhotoSet', { photoSetId: photoSetId, level: level, includePhotos: includePhotos });
        // },
        getPhotoSet: function() {
            jsonrpc.setHeaders('main', {
                'Content-Type': 'application/json'
            });

            return jsonrpc.request('version', {});
        },
        getVisitor: function() {
            return $soap.post(apiUrl, 'GetVisitorKey');
        }
    };
}

module.exports = PictureService;
