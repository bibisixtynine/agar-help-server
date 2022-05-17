
/////////////////////////////////////////////////////////////////////////
//                                                                    //
//                                                                   //
//      EKO-SERVER69- server.js
//        ( (express HTTP) + (websocket) ) SERVER
//
//      bibil - march 2022
//            - 22-03-09.2330+
//



//////////////////////////////////////////////////////////////
//                                                         //
// LIBs
//
// 
const WebSocket = require("ws");
//
const express = require('express')
//
const zutils = require("./zutils");
//                                      
// LIBs
//                                                          \\
//////////////////////////////////////////////////////////////
    


//////////////////////////////////////////////////////////////
//                                                         //
// DATA
//
// 
let nbClientConnected = 0

let  webSockets = {} // userID: webSocket

//                                                  
// DATA
//                                                          \\
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
//                                                         //
// HTTP EXPRESS SERVER
//
// 

//
// 1- server app - init
//

const app = express();

//
// 2- expressHttpServer for app
//
const expressHttpServer = require('http').createServer(app);

//
// 3- server app - logic
//
app.use(express.static(__dirname + '/public'));

// utils
let t = function(style,txt) {
  return `<span style="${style}">${txt}</span>`
}

let style = () =>
  `
  <style>
    body {
      background-color: red;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: space-around;
      justify-content: center;
      color:orange;
      font-size:6em; font-family:monospace";
    }

    div {
      width:90%;
      height:90%;
      margin:auto;
    }
  </style>
  `


let div1 = () =>
  `
  <div>
    ${t('color:yellow','>(')}
    ${t('margin-left:-50px','°')}
    ${t('margin-left:-50px; color:yellow','< ')}
    ${t('','°')}
    ${t('color:yellow; margin-left:-50px',')<')}
  </div>
  `

let div2 = (v) =>
  `
    <span style="color:orange; font-size:200px;">${v}</span>
  `

let script = () =>
  `
  <script>
    setTimeout(function() {
      window.location.reload()
    },1000)

    setTimeout(function() {
      document.body.style.color = "green"
    },500)

  </script>
  `




// express http server response to http request from client
app.get('/', function(request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.send(
    style() +
    `<body>` +
      div1() +
      div2(nbClientConnected) +
      script() +
    `</body>`
  )         
});

//
// 4- server run
//

expressHttpServer.listen(3000);
zutils.log('🖖 express http server started 🤩');

//
//                                                  
// HTTP EXPRESS SERVER
//                                                          \\
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
//                                                         //
// WEBSOCKET SERVER (added to expressHttpServer)
//
// 

//
// 1- websocket server - init
//

const wss = new WebSocket.Server({ noServer: true });

expressHttpServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });


zutils.log("💫😍🚀 agar-help-server reSTARTED and ONLINE now !")

//
// 2- data
//

let timer = false
let diodeState = true

//
// 3- utils
//

// 🚀
wss.broadcast = function broadcast(msg) {
  // Zutils.log("🚀 -> " + msg);
  nbClientConnected = 0
  wss.clients.forEach(function each(client) {
    client.send(msg);
    nbClientConnected++;
  });
  zutils.log("  -> broadcasted to " + nbClientConnected + " 🥳 !");
};

//
// 4- wss.onConnection => new CLIENT connected or old CLIENT back !
//

// 🥂
wss.on("connection", (socket) => {
  zutils.log("🥳 : new crazy client or old CLIENT back !");

  //
  // 5- ws.onMessage => BROADCAST any RECEIVED message
  //
  
  // ✉️
  socket.on("message", (message) => {
    zutils.log(`✉️ : ${message}`);
    let msg = JSON.parse(message)
    zutils.log(`✉️ : ${msg.request}`);
    zutils.log(`✉️ : ${msg.fileName}`);


    
    //  🚀
    if (msg.request && (msg.request=='loadCode'))  {
      console.log(msg)
      let codeExample = zutils.loadFile(msg.fileName)
      let answer = {
        answer:'loadCode',
        code: codeExample
      }
      console.log('##### send code to client !')
      socket.send(JSON.stringify(answer))
    } else {
      wss.broadcast(`${message}`);
    }

  }); // 5- ws.onMessage

}); // 4- wss.onConnection

//
//                                                  
// WEBSOCKET SERVER
//                                                          \\
//////////////////////////////////////////////////////////////



//
//
//      EKO-SERVER69- server.js
//                                                                    \\
//                                                                     \\
/////////////////////////////////////////////////////////////////////////

