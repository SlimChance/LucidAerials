'use strict';

function PictureService($resource) {
    'ngInject';
    //var resource = $resource('/data/pictures.json');

    // jsonrpc.request('GET', {
    //     "method": "GetVisitorKey",
    //     "id": 1
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // jsonrpc.request('GET', {
    //     "method": "AuthenticateVisitor",
    //     "params": [],
    //     "id": 1
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // jsonrpc.request('showHeaders', {
    //     "method": "LoadPhotoSet",
    //     "params": [908453492, "Level2", true],
    //     "id": 1
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // jsonrpc.request('http://api.zenfolio.com/api/1.8/zfapi.asmx/GetVisitorKey', 'GET', {}).then((data) => {
    //     console.log(data);
    // });

    // var pics = $http({
    //     url: 'http://cors.io/?u=http://api.zenfolio.com/api/1.8/zfapi.asmx/LoadPhotoSet?photoSetId=908453492&level=2&includePhotos=true',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    //     // {
    //     //     "method": "LoadPhotoSet",
    //     //     "params": [908453492, "Level2", true],
    //     //     "id": 1
    //     // }
    // });

    // pics.then((meow) => {
    //     console.log(meow);
    // }, (err) => {
    //     console.log(err);
    // });

    var pics = $resource('http://cors.io/?u=http://api.zenfolio.com/api/1.8/zfapi.asmx/LoadPhotoSet?:queryString', {}, {
        get: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });

    pics.get({ queryString: 'photoSetId=908453492&level=2&includePhotos=true' }).$promise.then((data) => {
        console.log(data);
    }, (err) => {
        console.log(err);
    })
    //     {
    //         method1: {
    //             method: 'JSONP',
    //             params: {
    //                 apiMethod: 'hello world'
    //             }
    //         },
    //         method2: {
    //             method: 'JSONP',
    //             params: {
    //                 apiMethod: 'hey ho!'
    //             }
    //         }
    //     }
    // );

    // var req = {
    //     method: 'GET',
    //     url: 'http://api.zenfolio.com/api/1.8/zfapi.asmx/LoadPhotoSet?photoSetId=908453492&level=2&includePhotos=true',
    //     // data: {
    //     //     'method': 'LoadPhoto',
    //     //     'params': [327977501, 'Level2']
    //     // }
    // }
    // var visitor = {
    //     method: 'GET',
    //     url: 'http://api.zenfolio.com/api/1.8/zfapi.asmx/GetVisitorKey'
    // }

    return {
        getVisitor: function() {
            return $http(visitor);
        },
        getPictures: function() {
            //return resource.query().$promise;
            return $http(req);
        }
    };
}

module.exports = PictureService;
