
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
var service_config = {
  token: '1234',
  appid: 'wx9864e897246928fe',
  encodingAESKey: 'hC08venFXMj9DqQLT7xNRg3sAQyLnRB3i74EliiILMQ'
};

const APIAI_ACCESS_TOKEN = 'a6b6b7d1db4f4a999bd5f7f862aa80ae';
const apiai = require("../module/apiai");
const apiAiService = apiai(APIAI_ACCESS_TOKEN, {language: 'en', requestSource: "fb"});

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
  if (message.MsgType == 'location') {
      console.log('location message: ', message.Label);   
      var longitude = message.Location_Y;
      var latitude = message.Location_X
      var text = String(latitude) + ' ' + String(longitude)
      let apiaiRequest = apiAiService.textRequest(text,
      {
        sessionId: message.FromUserName
      });

      apiaiRequest.on('response', function(response)
      {
        let responseText = response.result.fulfillment.speech;
        let responseData = response.result.fulfillment.data;
        let action = response.result.action;
        console.log('Response Text: ', responseText);
        res.reply(responseText);
        // res.reply([
        // {
        //   title: '你来我家接我吧',
        //   description: '这是女神与高富帅之间的对话',
        //   picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        //   url: 'http://nodeapi.cloudfoundry.com/'
        // }
        // ]);
        });

        apiaiRequest.on('error', (error) => console.error(error));
        apiaiRequest.end();
      // var postData = querystring.stringify({
      //   sessionId: message.FromUserName,
      //   longitude: longitude,
      //   latitude: latitude
      // });

      // var options = {
      //   hostname: 'localhost',
      //   port: 5000,
      //   path: '/check_location',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Content-Length': Buffer.byteLength(postData)
      //   }
      // };

      // var req = http.request(options, (response) => {
      //   var str = ''
      //   console.log(`STATUS: ${response.statusCode}`);
      //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      //   response.setEncoding('utf8');
      //   response.on('data', (chunk) => {
      //     console.log(`BODY: ${chunk}`);
      //     str += chunk
      //   });
      //   response.on('end', () => {
      //     var results = JSON.parse(str)
      //     res.reply(results.speech)
      //     console.log('No more data in response.');

      //     let apiaiRequest = apiAiService.contextsRequest(results.contextOut, {
      //         sessionId: sender
      //     });

      //     console.log('Happened something!')

      //     apiaiRequest.on('response', (response) => {
      //         console.log('Response from context setting', response.toString())
      //     });

      //     apiaiRequest.on('error', (error) => console.error(error));

      //     apiaiRequest.end();

      //   });
      // });

      // req.on('error', (e) => {
      //   console.log(`problem with request: ${e.message}`);
      // });

      // // write data to request body
      // req.write(postData);
      // req.end();
  }
  if (message.MsgType == 'event') {
    if (message.Event == 'subscribe') {
      responseText = "Hi，我是智能机器人，你的餐馆推荐小助手。目前可以根据你的喜好为你推荐南加州的中餐馆！\n你可以这样问我：有什么推荐的中餐馆？";
      res.reply(responseText);
    }
  }
  if (message.MsgType == 'text') {
    var text = message.Content;
    console.log('text message: ', message.Content);
    let apiaiRequest = apiAiService.textRequest(text,
    {
      sessionId: message.FromUserName
    });

    apiaiRequest.on('response', function(response)
    {
      let responseText = response.result.fulfillment.speech;
      let responseData = response.result.fulfillment.data;
      let action = response.result.action;
      console.log('Response Text: ', responseText);
      res.reply(responseText);
      // res.reply([
      // {
      //   title: '你来我家接我吧',
      //   description: '这是女神与高富帅之间的对话',
      //   picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
      //   url: 'http://nodeapi.cloudfoundry.com/'
      // }
      // ]);
      });

      apiaiRequest.on('error', (error) => console.error(error));
      apiaiRequest.end();
    // 回复高富帅(图文回复)
  }
}));

app.use('/wechat_service', wechat(service_config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  //console.log(req);
  var message = req.weixin;
  //res.reply("hehe");
  console.log(message);
  if (message.MsgType == 'location') {
      console.log('location message: ', message.Label);   
      var longitude = message.Location_Y;
      var latitude = message.Location_X
      var text = String(latitude) + ' ' + String(longitude)
      let apiaiRequest = apiAiService.textRequest(text,
      {
        sessionId: message.FromUserName
      });

      apiaiRequest.on('response', function(response)
      {
        let responseText = response.result.fulfillment.speech;
        let responseData = response.result.fulfillment.data;
        let action = response.result.action;
        console.log('Response Text: ', responseText);
        res.reply(responseText);
        // res.reply([
        // {
        //   title: '你来我家接我吧',
        //   description: '这是女神与高富帅之间的对话',
        //   picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        //   url: 'http://nodeapi.cloudfoundry.com/'
        // }
        // ]);
        });

        apiaiRequest.on('error', (error) => console.error(error));
        apiaiRequest.end();
      // var postData = querystring.stringify({
      //   sessionId: message.FromUserName,
      //   longitude: longitude,
      //   latitude: latitude
      // });

      // var options = {
      //   hostname: 'localhost',
      //   port: 5000,
      //   path: '/check_location',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Content-Length': Buffer.byteLength(postData)
      //   }
      // };

      // var req = http.request(options, (response) => {
      //   var str = ''
      //   console.log(`STATUS: ${response.statusCode}`);
      //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      //   response.setEncoding('utf8');
      //   response.on('data', (chunk) => {
      //     console.log(`BODY: ${chunk}`);
      //     str += chunk
      //   });
      //   response.on('end', () => {
      //     var results = JSON.parse(str)
      //     res.reply(results.speech)
      //     console.log('No more data in response.');

      //     let apiaiRequest = apiAiService.contextsRequest(results.contextOut, {
      //         sessionId: sender
      //     });

      //     console.log('Happened something!')

      //     apiaiRequest.on('response', (response) => {
      //         console.log('Response from context setting', response.toString())
      //     });

      //     apiaiRequest.on('error', (error) => console.error(error));

      //     apiaiRequest.end();

      //   });
      // });

      // req.on('error', (e) => {
      //   console.log(`problem with request: ${e.message}`);
      // });

      // // write data to request body
      // req.write(postData);
      // req.end();
  }
  if (message.MsgType == 'event') {
    if (message.Event == 'subscribe') {
      responseText = "Hi，我是智能机器人，你的餐馆推荐小助手。目前可以根据你的喜好为你推荐南加州的中餐馆！\n你可以这样问我：有什么推荐的中餐馆？";
      res.reply(responseText);
    }
    if (message.Event == 'LOCATION') {
      data = {"user_id": message.FromUserName,
      "event": "location",
      "latitude": message.Latitude,
      "longitude": message.Longitude
      }

      var options = {
        hostname: '54.183.198.179',
        port: 443,
        path: '/user_location',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      console.log("Location data: ", data)
      res.reply("")
      var req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
          var status = JSON.parse(chunk).Status;
          console.log('Status', status);
          if (status == 0) {
              let apiaiRequest = apiAiService.contextsRequest({
                'name' : 'user_send_photo',
                'lifespan' : 2
              }, {
                  sessionId: sender
              });

              console.log('Happened something!')

              apiaiRequest.on('response', (response) => {
                  console.log('Response from context setting', response.toString())
              });

              apiaiRequest.on('error', (error) => console.error(error));

              apiaiRequest.end();

              var textPart = "Oh, what do you want to do with this photo?"
              sendFBMessage(sender, {text: textPart});
          };
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });

      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
      });

      // write data to request body
      req.write(postData);
      req.end();
    }
    if (message.Event == 'unsubscribe') {
      res.reply("")
    }
  }
  if (message.MsgType == 'voice') {
    var text = message.Recognition;
    console.log('voice message: ', text);
    let apiaiRequest = apiAiService.textRequest(text,
    {
      sessionId: message.FromUserName
    });

    apiaiRequest.on('response', function(response)
    {
      let responseText = response.result.fulfillment.speech;
      let responseData = response.result.fulfillment.data;
      let action = response.result.action;
      console.log('Response Text: ', responseText);
      res.reply(responseText);
      // res.reply([
      // {
      //   title: '你来我家接我吧',
      //   description: '这是女神与高富帅之间的对话',
      //   picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
      //   url: 'http://nodeapi.cloudfoundry.com/'
      // }
      // ]);
      });

      apiaiRequest.on('error', (error) => console.error(error));
      apiaiRequest.end();
  }

  if (message.MsgType == 'text') {
    var text = message.Content;
    console.log('text message: ', message.Content);
    let apiaiRequest = apiAiService.textRequest(text,
    {
      sessionId: message.FromUserName
    });

    apiaiRequest.on('response', function(response)
    {
      let responseText = response.result.fulfillment.speech;
      let responseData = response.result.fulfillment.data;
      let action = response.result.action;
      console.log('Response Text: ', responseText);
      res.reply(responseText);
      // res.reply([
      // {
      //   title: '你来我家接我吧',
      //   description: '这是女神与高富帅之间的对话',
      //   picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
      //   url: 'http://nodeapi.cloudfoundry.com/'
      // }
      // ]);
      });

      apiaiRequest.on('error', (error) => console.error(error));
      apiaiRequest.end();
    // 回复高富帅(图文回复)
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
