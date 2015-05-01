'use strict';

angular.module('clientApp')
    .controller('VideosCtrl', function($scope, $window, $timeout) {
        // Initialize values. Expanded toggles expanded class on top videos. Players holds the YT videos created
        $scope.expanded = 0;
        var players = [];

        // Videos array
        $scope.videos = [{
            'title': 'Rock Climbing and Views Along Hwy 70',
            'poster': 'url(http://lorempixel.com/500/400/sports/1)',
            'description': 'Rock Climbing and Views Along Hwy 70',
            'id': '6ZqioJpOBqM'
        },{
            'title': 'Quadcopter Footage of Burnsville',
            'poster': 'url(http://lorempixel.com/500/400/sports/2)',
            'description': 'Some Aerial shots of/around Burnsville and Butte Creek Canyon.',
            'id': 'yOE9-gaiJn4'
        }, {
            'title': 'Butte Creek Canyon',
            'poster': 'url(http://lorempixel.com/500/400/sports/3)',
            'description': 'Butte creek canyon captured with a gopro and quadcopter.',
            'id': 'RFcto_jIc8o'
        }, {
            'title': 'Christmas Lights at Meadow Brook in Chico, California.',
            'poster': 'url(http://lorempixel.com/500/400/sports/4)',
            'description': 'Christmas Lights at Meadow Brook Models in Chico, CA.',
            'id': '-yl2vT7CCMA'
        }, {
            'title': 'Duck Hunting Adventures',
            'poster': 'url(http://lorempixel.com/375/250/sports/5)',
            'description': 'Duck Hunting Adventures with a GoPro and Quadcopter',
            'id': 'WrdT2xFSRLw'
        }, {
            'title': 'Lucid Aerials 2014 Highlight Video',
            'poster': 'url(http://lorempixel.com/375/250/sports/6)',
            'description': 'A Highlight video of some of Lucid Aerials 2014 adventures/experiences.',
            'id': 'l4EIbGzH-YU'
        }, {
            'title': 'Mountain Biking the Sierra Nevada Mountain Range',
            'poster': 'url(http://lorempixel.com/375/250/sports/7)',
            'description': 'Lucid Aerials Capture Matt Tuma Mountain Biking near De Sabla Reservoir in Magalia, CA',
            'id': 'z1yuqKaS_6s'
        }, {
            'title': 'Welcome to the Nye Ranch',
            'poster': 'url(http://lorempixel.com/375/250/sports/8)',
            'description': 'Fort Bragg November 2014',
            'id': 'w4NcSnNkvOI'
        }, {
            'title': 'Rock Climbing and views along Hwy 70',
            'poster': 'url(http://lorempixel.com/375/250/sports/9)',
            'description': 'Northern California views and activites filmed by Lucid Aerials. Shoutout to the climbers who allowed us to film them! Thank you again!',
            'id': '6ZqioJpOBqM'
        }, {
            'title': 'A Day in the Snow',
            'poster': 'url(http://lorempixel.com/375/250/sports/10)',
            'description': 'A day in the snowy Sierra Nevadas',
            'id': 'Xk8IcVwvd_U'
        }];

        // Check if index is a top video
        $scope.checkIndex = function(index) {
            if (index < 4) {
                return true;
            } else {
                return false;
            }
        };

        // Check if top video is already expanded
        $scope.checkExpanded = function(index)  {
            if ($scope.expanded === index && $scope.expanded < 4) {
                return true;
            } else {
                return false;
            }
        };
        
        // Play the selected video
        $scope.play = function(index) {
            console.log("play: " + index + ", playersArray: " + players[index]);
            console.log(players.indexOf(index));
            if (players[index]) {
                if (players[index].getPlayerState() !== 1) {
                    players[index].playVideo();
                }
            } else {
                console.log('Failed to play video ' + index);
            }
        };

        // Pause video. Mostly called once a new video has been played or expanded.
        $scope.pause = function(index) {
            console.log("pause: " + index);
            if (players[index]) {
                if (players[index].getPlayerState() === 1) {
                    players[index].pauseVideo();
                }
            } else {
                console.log('Failed to pause video ' + index);
            }
        };

        // Check if already expanded, if not expand
        $scope.expand = function(index, bool) {
            if (index !== $scope.expanded) {
                // Check if in array
                console.log("Expanded: " + $scope.expanded);
                $scope.pause($scope.expanded);

                $scope.expanded = index;
            }
        };

        // Attaching element to createPlayer call. Check whether player already exists
        $scope.grabVideo = function(index, bool) {
            // replace 'ytplayer' element with iframe
            var element = 'ytplayer' + index;

            // Check if index has already been created
            if (!players[index]) {
                $scope.player.createPlayer(element, index);
            }
        };

        // Player object
        $scope.player = {
            // Grab api and load first video
            init: function() {
                var tag = document.createElement('script');

                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                // Load in first video once API loaded
                $window.onYouTubeIframeAPIReady = function() {
                    players = [];
                    $scope.YTPlayer = new YT.Player('ytplayer0', {
                        height: '100%',
                        width: '100%',
                        videoId: $scope.videos[0].id
                    });

                    players.push($scope.YTPlayer);
                    
                    console.log("init array: " + players);

                    /******** FIX THIS. Wait to load 1 and 2 **********/
                    //$scope.grabVideo(1, false);
                    //$scope.grabVideo(2, false);
                }
            },
            // Create the video and add it to dom. Must go through grabVideo
            createPlayer: function(element, index) {
                $scope.YTPlayer = new YT.Player(element, {
                    height: '100%',
                    width: '100%',
                    videoId: $scope.videos[index].id,
                    playerVars: {
                        autoplay: 0
                    }
                });

                players.push($scope.YTPlayer);
            }
        };
        // Initialize player api on page load
        $scope.player.init();

        // Lazy load elements checking rather they already exist
        angular.element($window).on('scroll', function() {
            if ($window.scrollY > 50 && !players[3]) { 
                 $scope.grabVideo(3, false);
                 console.log("loaded 3");
            }
            if ($window.scrollY > 350 && !players[4]) {
                 $scope.grabVideo(4, true);
                 console.log("loaded 4");
            }
            if ($window.scrollY > 650 && !players[5]) {
                 $scope.grabVideo(5, true);
                 console.log("loaded 5");
            }
            if ($window.scrollY > 1100 && !players[6]) {
                 $scope.grabVideo(6, true);
                 console.log("loaded 6");
            }
            if ($window.scrollY > 1550 && !players[7]) {
                 $scope.grabVideo(7, true);
                 console.log("loaded 7");
            }
            if ($window.scrollY > 2000 && !players[8]) {
                 $scope.grabVideo(8, true);
                 console.log("loaded 8");
            }
            if ($window.scrollY > 2450 && !players[9]) {
                 $scope.grabVideo(9, true);
                 console.log("loaded 9");
            }
        });

        $timeout(function() { $scope.grabVideo(1, false); }, 2000);
        $timeout(function() { $scope.grabVideo(2, false); }, 2000);
    });
