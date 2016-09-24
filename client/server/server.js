var express = require('express');
var instagram = require('instagram-node').instagram();
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

instagram.use({ access_token: '1553678469.bee79ae.81d8e2f20f9844ef9518f726d3e58e1f' });

app.get('/instagram-feed', function(req, res) {
    instagram.user_media_recent('1553678469', function(err, medias, pagination, remaining, limit) {
        res.send(medias);
    });
});

app.listen(8000, () => {
  console.log("listening port 8000");
});
