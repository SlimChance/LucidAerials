'use strict';

function VideoService($q, $http, $rootScope, $cacheFactory, $timeout) {
    'ngInject';
    const youtubeApi = 'https://www.googleapis.com/youtube/v3/playlistItems',
          key = 'AIzaSyB_nhTaFbVfTkzQbg8Yq23P6HNoE8cROsk', // require key on server?
          part = 'snippet',
          playlistId = 'PLTKCH_zvmqr_QjUjif0HgJ8U2bGUVJ6Ws';

    let vs = {
            busy: false,
            cache: {},
            videos: [],
            getVideos: getVideos,
            getCache: getCache,
            putCache: putCache,
            clearCache: clearCache,
            createPlayer: createPlayer,
            playerStateChange: playerStateChange,
            init: init
        }

    function getVideos(pageToken) {
        // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=key&playlistId=playlistId&maxResults=50
        $http.get(youtubeApi, { params: { part: part, key: key, playlistId: playlistId, maxResults: 50 } }).then((videos) => {
            vs.videos = videos.data.items;
        }, (e) => { console.log(e) });
    }

    function getCache(videoId) {
        return vs.cache[videoId];
    }

    function putCache(videoId, video) {
        vs.cache[videoId] = video;
    }

    function clearCache() {
        console.log('clear cache');
        vs.cache = {};
    }

    function createPlayer(elementId, index) {
        let videoId = vs.videos[index].snippet.resourceId.videoId,
            element = angular.element(elementId)[0];

        vs.busy = true;

        if (element) {
            $timeout(() => createYTPlayer(element, elementId, videoId), 0);
        } else {
            console.log('element not defined, recreating');
            $timeout(() => createPlayer(elementId, index), 500);
        }
    }

    function createYTPlayer(element, elementId, videoId) {
        if (YT) {
            var YTPlayer = new YT.Player(element, {
                videoId: videoId,
                playerVars: {
                    autoplay: 0
                },
                events: {
                    'onStateChange': playerStateChange
                }
            });

            console.log('Player created, placing in cache');
            putCache(videoId, YTPlayer);
            vs.busy = false;
        } else {
            console.log('Recreating player');
            createPlayer(elementId, videoId);
        }
    }

    function playerStateChange(event) {
        if (event.data === 0) {
            var iframeId = event.target.a.id;
            var indexPattern = /\d+/g;
            var index = iframeId.match(indexPattern)[0];
            var nextVideo = parseInt(index) + 1;

            $rootScope.$emit('playNext', nextVideo);
        }
    }

    function init(itemsPerPage) {
        getVideos();

        $timeout(function() {
            var element = 'div#ytplayer0',
                index = 0;

            createPlayer(element, index);
        }, 1000);
    }

    return vs;
}

module.exports = VideoService;