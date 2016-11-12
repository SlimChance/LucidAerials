'use strict';

function PictureService($resource) {
    'ngInject';
    let pictures = [];
    let comments = [];

    return {
        pictures: pictures,
        comments: comments,
        getRecentPhotos: () => {
            return $resource('http://localhost:8000/instagram-feed');
        },
        getComments: (mediaId) => {
            return $resource(`http://localhost:8000/comments?id=${mediaId}`);
        }
    };
}

module.exports = PictureService;
