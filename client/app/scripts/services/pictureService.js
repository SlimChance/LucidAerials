'use strict';

function PictureService($resource) {
    'ngInject';

    return {
        getRecentPhotos: () => {
            return $resource('http://localhost:8000/instagram-feed');
        }
    };
}

module.exports = PictureService;
