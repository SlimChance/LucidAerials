'use strict';

lucidAerials.service('videoService', function ($resource) {
    	var resource = $resource('/data/videos.json');

    	return {
    		getVideos: function () {
    			return resource.query();
    		}
    	}
    });