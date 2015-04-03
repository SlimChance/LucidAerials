'use strict';

angular.module('clientApp')
    .controller('VideosCtrl', function($scope, $window) {
        $scope.expanded = 0;
        $scope.expandedArr = [0];

        $scope.topVideos = [{
            'title': 'Rock Climbing and Views Along Hwy 70',
            'poster': 'url(../images/nye.jpg)',
            'description': 'Rock Climbing and Views Along Hwy 70',
            'id': '6ZqioJpOBqM'
        },{
            'title': 'Quadcopter Footage of Burnsville',
            'poster': 'url(../images/Burnsville.jpg)',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.',
            'id': 'yOE9-gaiJn4'
        }, {
            'title': 'Butte Creek Canyon',
            'poster': 'url(../images/ButteCreek.jpg)',
            'description': 'Butte creek canyon captured with a gopro and quadcopter.',
            'id': 'RFcto_jIc8o'
        }, {
            'title': 'Christmas Lights at Meadow Brook in Chico, California.',
            'poster': 'url(../images/ChristmasLights.jpg)',
            'description': 'Christmas Lights at Meadow Brook Models in Chico, CA.',
            'id': '-yl2vT7CCMA'
        }];
        $scope.videos = [{
            'title': 'Duck Hunting Adventures',
            'poster': '../images/DuckHunting.jpg',
            'description': 'Duck Hunting Adventures with a GoPro and Quadcopter'
        }, {
            'title': 'Lucid Aerials 2014 Highlight Video',
            'poster': '../images/HighlightVideo.jpg',
            'description': 'A Highlight video of some of Lucid Aerials 2014 adventures/experiences.'
        }, {
            'title': 'Mountain Biking the Sierra Nevada Mountain Range',
            'poster': '../images/MountainBiking.jpg',
            'description': 'Lucid Aerials Capture Matt Tuma Mountain Biking near De Sabla Reservoir in Magalia, CA'
        }, {
            'title': 'Welcome to the Nye Ranch',
            'poster': '../images/NyeRanch.jpg',
            'description': 'Fort Bragg November 2014'
        }, {
            'title': 'Rock Climbing and views along Hwy 70',
            'poster': '../images/RockClimbing.jpg',
            'description': 'Northern California views and activites filmed by Lucid Aerials. Shoutout to the climbers who allowed us to film them! Thank you again!'
        }, {
            'title': 'A Day in the Snow',
            'poster': '../images/SnowDay.jpg',
            'description': 'A day in the snowy Sierra Nevadas'
        }, {
            'title': 'Thanksgiving Turkey Bowl 2014',
            'poster': '../images/TurkeyBowl.jpg',
            'description': 'The Annual Thanksgiving Turkey Bowl at Wraith Field.'
        }];

        $scope.play = function(index) {
            if (players[index].getPlayerState() != 1) {
                players[index].playVideo();
            }
        };

        $scope.pause = function(index) {
            if (players[index].getPlayerState() == 1) {
                players[index].pauseVideo();   
            }
        }

        $scope.expand = function(index) {
            if (index !== $scope.expanded) {
                // Check if in array
                $scope.pause($scope.expanded);
                if ($scope.expandedArr.indexOf(index) == -1) {
                    $scope.grabVideo(index);
                    $scope.expandedArr.push(index);
                }
                $scope.expanded = index;
            }
        };

        $scope.grabVideo = function(index) {
            // replace 'ytplayer' element with iframe
            var div = 'ytplayer' + index;

            function createPlayer(div, index) {
                player = new YT.Player(div, {
                    height: '100%',
                    width: '100%',
                    videoId: $scope.topVideos[index].id,
                    playerVars: {
                        autoplay: 0
                    }
                    // events: {
                    //     'onStateChange': videoEnd
                    // }
                });

                // Check if not in array!!!!
                players.push(player);
            };
            
            createPlayer(div, index);
        };
    });
