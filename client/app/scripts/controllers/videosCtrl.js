'use strict';

angular.module('clientApp')
    .controller('VideosCtrl', function($scope, $window) {
        $scope.firstThree = [{
            'title': 'Quadcopter Footage of Burnsville',
            'webmURL': '../videos/Burnsville.webm',
            'mp4URL': '../videos/Burnsville.mp4',
            'poster': '../images/Burnsville.jpg',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.'
        }, {
            'title': 'Butte Creek Canyon',
            'webmURL': '../videos/ButteCreek.webm',
            'mp4URL': '../videos/ButteCreek.mp4',
            'poster': '../images/ButteCreek.jpg',
            'description': 'Butte creek canyon captured with a gopro and quadcopter.'
        }, {
            'title': 'Christmas Lights at Meadow Brook in Chico, California.',
            'webmURL': '../videos/ChristmasLights.webm',
            'mp4URL': '../videos/ChristmasLights.mp4',
            'poster': '../images/ChristmasLights.jpg',
            'description': 'Christmas Lights at Meadow Brook Models in Chico, CA.'
        }];
        $scope.videos = [{
            'title': 'Duck Hunting Adventures',
            'webmURL': '../videos/DuckHunting.webm',
            'mp4URL': '../videos/DuckHunting.mp4',
            'poster': '../images/DuckHunting.jpg',
            'description': 'Duck Hunting Adventures with a GoPro and Quadcopter'
        }, {
            'title': 'Lucid Aerials 2014 Highlight Video',
            'webmURL': '../videos/HighlightVideo.webm',
            'mp4URL': '../videos/HighlightVideo.mp4',
            'poster': '../images/HighlightVideo.jpg',
            'description': 'A Highlight video of some of Lucid Aerials 2014 adventures/experiences.'
        }, {
            'title': 'Mountain Biking the Sierra Nevada Mountain Range',
            'webmURL': '../videos/MountainBiking.webm',
            'mp4URL': '../videos/MountainBiking.mp4',
            'poster': '../images/MountainBiking.jpg',
            'description': 'Lucid Aerials Capture Matt Tuma Mountain Biking near De Sabla Reservoir in Magalia, CA'
        }, {
            'title': 'Welcome to the Nye Ranch',
            'webmURL': '../videos/NyeRanch.webm',
            'mp4URL': '../videos/NyeRanch.mp4',
            'poster': '../images/NyeRanch.jpg',
            'description': 'Fort Bragg November 2014'
        }, {
            'title': 'Rock Climbing and views along Hwy 70',
            'webmURL': '../videos/RockClimbing.webm',
            'mp4URL': '../videos/RockClimbing.mp4',
            'poster': '../images/RockClimbing.jpg',
            'description': 'Northern California views and activites filmed by Lucid Aerials. Shoutout to the climbers who allowed us to film them! Thank you again!'
        }, {
            'title': 'A Day in the Snow',
            'webmURL': '../videos/SnowDay.webm',
            'mp4URL': '../videos/SnowDay.mp4',
            'poster': '../images/SnowDay.jpg',
            'description': 'A day in the snowy Sierra Nevadas'
        }, {
            'title': 'Thanksgiving Turkey Bowl 2014',
            'webmURL': '../videos/TurkeyBowl.webm',
            'mp4URL': '../videos/TurkeyBowl.mp4',
            'poster': '../images/TurkeyBowl.jpg',
            'description': 'The Annual Thanksgiving Turkey Bowl at Wraith Field.'
        }];

        function doYT() {
            $window.player = new YT.Player('video_player', {
                width: '768',
                height: '432',
                videoId: '6ZqioJpOBqM',
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

        $window.YT && doYT() || function() {
            var a = document.createElement("script");
            a.setAttribute("type", "text/javascript");
            a.setAttribute("src", "http://www.youtube.com/player_api");
            a.onload = doYT;
            a.onreadystatechange = function() {
                if (this.readyState == "complete" || this.readyState == "loaded") doYT()
            };
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(a)
        }();

        function onPlayerReady(event) {
            event.target.playVideo();
        };
    });
