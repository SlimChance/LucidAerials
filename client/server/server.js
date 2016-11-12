var express = require('express');
var https = require('https');
var app = express();

var host = 'https://api.instagram.com/v1';
var user_id = '1553678469';
var access_token = '1553678469.bee79ae.81d8e2f20f9844ef9518f726d3e58e1f';
var media_id = '1376181895146303135_1553678469';

var instagram = {
    user_media_recent_path: `${host}/users/self/media/recent/?access_token=${access_token}`,
    comment_path: `${host}/media/${media_id}/comments?access_token=${access_token}`
};

function setCommentUrl(id) {
    return `${host}/media/${id}/comments?access_token=${access_token}`;
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:9000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/instagram-feed', function(req, res) {
    var req = https.get(instagram.user_media_recent_path, function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        }).on('end', function(data) {
            var parsed = JSON.parse(body);

            res.send(parsed);
        });
    });

    req.on('error', function(e) {
        console.log(e);
    });
});

app.get('/comments', function (req, res) {
    var path = setCommentUrl(req.query.id);
  var req = https.get(path, function(response) {
    var body = '';

    response.on('data', function(chunk) {
        body += chunk;
    }).on('end', function(data) {
        var parsed = JSON.parse(body);

        res.send(parsed);
    });
  });

  req.on('error', function(e) {
      console.log(e);
  });
});

app.listen(8000, () => {
  console.log("listening port 8000");
});
