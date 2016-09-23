var express = require('express');
var instagram = require('instagram-node').instagram();
var app = express();

instagram.use({ access_token: '1553678469.bee79ae.81d8e2f20f9844ef9518f726d3e58e1f' });
// instagram.use({
//   client_id: 'bee79ae41b074846bac36e57446d1141',
//   client_secret: 'a37a71f2c42e4596af83d0077e448192'
// });

console.log(instagram);

var pics = instagram.user_media_recent('1553678469', function(err, medias, pagination, remaining, limit) {
    console.log(medias);
});

app.listen(8000,function(){
  console.log("listening port 8000");
});

// https://api.instagram.com/v1/users/1553678469/media/recent/?access_token=1553678469.bee79ae.81d8e2f20f9844ef9518f726d3e58e1f
