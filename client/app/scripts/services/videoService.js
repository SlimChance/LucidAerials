'use strict';

lucidAerials.service('videoService', function ($window, $q) {
    var me = this;

    me.player = [,,,,,,,,,];
    me.videos = [
        {
            "title": "Rock Climbing and Views Along Hwy 70",
            "poster": "url(http://lorempixel.com/1920/900/sports/1)",
            "description": "Rock Climbing and Views Along Hwy 70",
            "id": "6ZqioJpOBqM"
        },
        {
            "title": "Quadcopter Footage of Burnsville",
            "poster": "url(http://lorempixel.com/1920/900/sports/2)",
            "description": "Some Aerial shots of/around Burnsville and Butte Creek Canyon.",
            "id": "yOE9-gaiJn4"
        },
        {
            "title": "Butte Creek Canyon",
            "poster": "url(http://lorempixel.com/1920/900/sports/3)",
            "description": "Butte creek canyon captured with a gopro and quadcopter.",
            "id": "RFcto_jIc8o"
        },
        {
            "title": "Christmas Lights at Meadow Brook in Chico, California.",
            "poster": "url(http://lorempixel.com/1920/900/sports/4)",
            "description": "Christmas Lights at Meadow Brook Models in Chico, CA.",
            "id": "-yl2vT7CCMA"
        },
        {
            "title": "Duck Hunting Adventures",
            "poster": "url(http://lorempixel.com/1920/1080/sports/5)",
            "description": "Duck Hunting Adventures with a GoPro and Quadcopter",
            "id": "WrdT2xFSRLw"
        },
        {
            "title": "Lucid Aerials 2014 Highlight Video",
            "poster": "url(http://lorempixel.com/1920/1080/abstract/1)",
            "description": "A Highlight video of some of Lucid Aerials 2014 adventures/experiences.",
            "id": "l4EIbGzH-YU"
        },
        {
            "title": "Mountain Biking the Sierra Nevada Mountain Range",
            "poster": "url(http://lorempixel.com/1920/1080/sports/7)",
            "description": "Lucid Aerials Capture Matt Tuma Mountain Biking near De Sabla Reservoir in Magalia, CA",
            "id": "z1yuqKaS_6s"
        },
        {
            "title": "Welcome to the Nye Ranch",
            "poster": "url(http://lorempixel.com/1920/1080/sports/8)",
            "description": "Fort Bragg November 2014",
            "id": "w4NcSnNkvOI"
        },
        {
            "title": "Rock Climbing and views along Hwy 70",
            "poster": "url(http://lorempixel.com/1920/1080/sports/9)",
            "description": "Northern California views and activites filmed by Lucid Aerials. Shoutout to the climbers who allowed us to film them! Thank you again!",
            "id": "6ZqioJpOBqM"
        },
        {
            "title": "A Day in the Snow",
            "poster": "url(http://lorempixel.com/1920/1080/sports/10)",
            "description": "A day in the snowy Sierra Nevadas",
            "id": "Xk8IcVwvd_U"
        }
    ];

    me.init = function () {
        var tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Load in first video once API loaded
        $window.onYouTubeIframeAPIReady = function() {
            //players = [9];
            var YTPlayer = new YT.Player('ytplayer0', {
                videoId: me.videos[0].id
            });

            me.player.splice(0, 1, YTPlayer);

            console.log("init array: " + me.player);
        }
    };

        // Create the video and add it to dom. Must go through expand
    me.createPlayer = function(element, index) {
        var deferred = $q.defer();

        var createYTPlayer = function () {
            var YTPlayer = new YT.Player(element, {
                videoId: me.videos[index].id,
                playerVars: {
                    autoplay: 0
                }
            });

            console.log('create player called');
            me.player.splice(index, 1, YTPlayer);
        }

        deferred.resolve(createYTPlayer());

        return deferred.promise;
    };
});