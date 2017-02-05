var app = require('express')();
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./path/to/private.pem', 'utf8');
var certificate = fs.readFileSync('./path/to/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
var app = express();
var wechat = require('wechat');
var config = {
  token: '1234',
  appid: 'wx02e61a6df898cf28',
  encodingAESKey: 'y9zUzvXPb78IsoPVMXoVXUmVs6C9JuyUDEQzAIwBypO'
};

app.use(express.query());
app.get('/', function (req, res) {
  console.log(req);
});
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  //console.log(req);
  var message = req.weixin;
  //res.reply("hehe");
  console.log(message);
  if (message.FromUserName === 'diaosi') {
    // 回复屌丝(普通回复)
    res.reply('hehe');
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    res.reply({
      content: 'text object',
      type: 'text'
    });
  } else if (message.FromUserName === 'hehe') {
    // 回复一段音乐
    res.reply({
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3",
        thumbMediaId: "thisThumbMediaId"
      }
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}));

//app.listen(80, () => {
//    console.log('Rest service ready on port ' + 443);
//});
//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var SSLPORT = 443;
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
