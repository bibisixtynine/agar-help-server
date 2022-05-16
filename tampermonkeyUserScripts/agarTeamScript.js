/////////////////////////////////////////////////////////////////////////
//                                                                    //
// utils
//
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

// translate x(range 0->25000), y(range 0->25000) in line(range A->E),column (range 1->5)
function quadPos(pos) {
  let abcde = "ABCDE";
  let iY = Math.floor(pos.y / 5000);
  let cY = abcde[iY];
  let iX = Math.floor(pos.x / 5000) + 1;
  return cY + iX;
}
//
// utils
//                                                                   \\
//////////////////////////////////////////////////////////////////////\\


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// INIT
//
console.log("😍 hello Sir ! welcome to chaminou agar.team hack 😜");

let serverURL = "wss://agar-help-server.glitch.me";

let player = {
  pos: { x: 0, y: 0 },
  name: "toto",
  radius: 0,
};

let otherPlayers = {};

let gameStarted = false;

let nbFillTextWithPlayerNameCalls = 1;

let lastArcRadius = 0;

let isAutoLoadOn = true;
//
// INIT
//                                                            \\
///////////////////////////////////////////////////////////////\\


/////////////////////////////////////////////////////////////////
//                                                            //
// socket communication : send and receive player(s) pos
//
// server communication
let com = new BBSocket(serverURL)
  .onConnect(() => {
    com.sendMessage({ text: "Hello !", from: "Agar TamperMonkey Hack" });
    setInterval(() => {
      com.sendMessage({
        playerName: player.name,
        x: player.pos.x,
        y: player.pos.y,
        quadPos: quadPos(player.pos),
      });
    }, 1000);
  })
  .onMessage((msg) => {
    if (msg.from) {
      console.log(
        '💥💥💥 "' +
          msg.text +
          '" send to and received from "' +
          msg.from +
          '" 💥💥💥'
      );
    }
    if (msg.playerName) {
      if (msg.playerName == player.name) return;
      otherPlayers[msg.playerName] = msg;

      display.innerHTML = "";
      for (const [key, value] of Object.entries(otherPlayers)) {
        display.innerHTML += "[" + value.playerName + ": " + value.quadPos + "] ";
      }
    }
  });
//
// socket communication : send and receive player(s) pos
//                                                            \\
///////////////////////////////////////////////////////////////\\


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// display other(s) player(s) pos
//
let display = document.createElement("div");
display.style.position = "fixed";
display.style.left = "3px";
display.style.top = "3px";
display.style.padding = "5px";
display.style.margin = "5px";
display.style.backgroundColor = "#00AA00AA";
display.style.color = "white";
display.style.fontSize = "12px";
display.style.border = "solid";
display.style.borderColor = "black";
display.style.borderRadius = "5px";
display.style.borderWidth = "2px";
display.innerHTML = "alone 2, the return";
display.style.zIndex = 30000;
display.addEventListener("click", (event) => {
  let element = event.srcElement;
  let oldColor = element.style.backgroundColor;
  element.style.backgroundColor = "white";
  setTimeout(() => {
    element.style.backgroundColor = oldColor;
    location.reload();
  }, 300);
});
document.body.appendChild(display);
//
// display other(s) player(s) pos
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// drawImage interception
//
let images = [];
function addImage(image) {
  if (!image.src) return;
  if (!image.src.includes("skin")) return;
  for (let i = 0; i < images.length; i++) {
    if (images[i] == image) return; // already there...
  }
  images.push(image);
  console.log("🤓 <" + images.length + "> images identified");
  console.log(image);
}

CanvasRenderingContext2D.prototype.drawImageOriginal =
  CanvasRenderingContext2D.prototype.drawImage;
CanvasRenderingContext2D.prototype.drawImage = function () {
  // call the original function
  addImage(arguments[0]);
  if (arguments[0].src) {
    if (arguments[0].src.includes("skin")) {
      return;
    }
  }

  CanvasRenderingContext2D.prototype.drawImageOriginal.apply(this, arguments);
  player.radius = lastArcRadius;
};
//
// drawImage interception
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// clearRect
//
CanvasRenderingContext2D.prototype.clearRectOriginal =
  CanvasRenderingContext2D.prototype.clearRect;
CanvasRenderingContext2D.prototype.clearRect = function () {
  // call the original function
  //CanvasRenderingContext2D.prototype.clearRectOriginal.apply(this,arguments)
  //this.setFillStyle('red')
  //this.fillRect(arguments[0],arguments[1],arguments[3],arguments[3])
};

//
// clearRect
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// ellipse
//
CanvasRenderingContext2D.prototype.ellipseOriginal =
  CanvasRenderingContext2D.prototype.ellipse;
CanvasRenderingContext2D.prototype.ellipse = function () {
  // call the original function
  CanvasRenderingContext2D.prototype.ellipseOriginal.apply(this, arguments);
};
//
// ellipse
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// putImageData
//
CanvasRenderingContext2D.prototype.putImageDataOriginal =
  CanvasRenderingContext2D.prototype.putImageData;
CanvasRenderingContext2D.prototype.putImageData = function () {
  // call the original function
  // return CanvasRenderingContext2D.prototype.putImageDataOriginal.apply(this,arguments)
};
//
// putImageData
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// beginPath
//
CanvasRenderingContext2D.prototype.beginPathOriginal =
  CanvasRenderingContext2D.prototype.beginPath;
CanvasRenderingContext2D.prototype.beginPath = function () {
  // call the original function
  return CanvasRenderingContext2D.prototype.beginPathOriginal.apply(
    this,
    arguments
  );
};
//
// beginPath
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// arcTo
//
CanvasRenderingContext2D.prototype.arcToOriginal =
  CanvasRenderingContext2D.prototype.arcTo;
CanvasRenderingContext2D.prototype.arcTo = function () {
  // call the original function
  return CanvasRenderingContext2D.prototype.arcToOriginal.apply(
    this,
    arguments
  );
};
//
// arcTo
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// bezierCurveTo
//
CanvasRenderingContext2D.prototype.bezierCurveToOriginal =
  CanvasRenderingContext2D.prototype.bezierCurveTo;
CanvasRenderingContext2D.prototype.bezierCurveTo = function () {
  // call the original function
  return CanvasRenderingContext2D.prototype.bezierCurveToOriginal.apply(
    this,
    arguments
  );
};
//
// bezierCurveTo
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// fillRect
//
CanvasRenderingContext2D.prototype.fillRectOriginal =
  CanvasRenderingContext2D.prototype.fillRect;
CanvasRenderingContext2D.prototype.fillRect = function () {
  // call the original function
  this.setFillStyle("black");
  return CanvasRenderingContext2D.prototype.fillRectOriginal.apply(
    this,
    arguments
  );
};
//
// fillRect
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// arc interception
//
CanvasRenderingContext2D.prototype.setFillStyle = function () {
  this.fillStyle = arguments[0];
};
CanvasRenderingContext2D.prototype.setStrokeStyle = function () {
  this.strokeStyle = arguments[0];
};
CanvasRenderingContext2D.prototype.setLineWidth = function () {
  this.lineWidth = arguments[0];
};
CanvasRenderingContext2D.prototype.arcOriginal =
  CanvasRenderingContext2D.prototype.arc;
CanvasRenderingContext2D.prototype.arc = function () {
  // call the original function
  if (player.radius * player.radius > 2 * arguments[2] * arguments[2]) {
    //this.setFillStyle('#0000AAAA') // player is at least twice bigger => set other entity color to transparent blue
    this.setFillStyle("#0000AA22"); // player is at least twice bigger => set other entity color to transparent blue
  } else if (player.radius > arguments[2]) {
    //this.setFillStyle('#00AA00AA') // player is bigger => set color to transparent green
    this.setFillStyle("#00AA0022"); // player is bigger => set color to transparent green
  } else {
    //this.setFillStyle('#AA0000AA') // player is bigger => set color to transparent red
    this.setFillStyle("#AA000022"); // player is bigger => set color to transparent red
  }
  lastArcRadius = arguments[2];
  let r = this.arcOriginal(
    arguments[0],
    arguments[1],
    arguments[2],
    arguments[3],
    arguments[4]
  );

  this.setStrokeStyle("#00AA00AA");
  this.setLineWidth(20);
  this.stroke();
};
//
// arc interception
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// fillText interception
//
CanvasRenderingContext2D.prototype.fillTextOriginal =
  CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function () {
  // call the original function
  //let r = this.fillTextOriginal(arguments[0], arguments[1], arguments[2])
  this.setFillStyle("#00FF00FF");
  let r = this.fillTextOriginal(arguments[0], arguments[1], arguments[2]);

  // retrieve x,y coordinates of the player by scanning fillText('...X:...',....)

  //console.log('#############' + this.font + '###############')

  if (isString(arguments[0]) && arguments[0].includes("X:")) {
    player.pos.x = arguments[0].replace(/[^0-9]/g, "");
    //console.log('🍄🍄🍄🍄🍄🍄🍄🍄 X: <' + player.pos.x +'> 🍄🍄🍄🍄🍄🍄🍄🍄')
  }
  if (isString(arguments[0]) && arguments[0].includes("Y:")) {
    player.pos.y = arguments[0].replace(/[^0-9]/g, "");
    //console.log('🍄🍄🍄🍄🍄🍄🍄🍄 Y: <' + player.pos.y + '>🍄🍄🍄🍄🍄🍄🍄🍄')
  }

  // init
  if (isString(arguments[0])) {
    gameStarted = true;
    if (arguments[0].toUpperCase().includes(player.name.toUpperCase())) {
      //console.log('🥳 orignalFillText: <' + arguments[0] + '> , x:' + arguments[1] + ', y:' + arguments[2] );
      nbFillTextWithPlayerNameCalls++;
    }
  }
  return r;
};
//
// fillText interception
//                                                                      //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// autoreload if player is no more here
//
setInterval(() => {
  if (gameStarted && nbFillTextWithPlayerNameCalls > 0) {
    nbFillTextWithPlayerNameCalls = 0;
    return;
  } else if (gameStarted) {
    if (isAutoLoadOn) location.reload();
  }
}, 2000);

//
// autoreload if player is no more here
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// isElementVisible ?
//
function isElementVisible(elem) {
  if (!(elem instanceof Element))
    throw Error("DomUtil: elem is not an element.");
  const style = getComputedStyle(elem);
  if (style.display === "none") return false;
  if (style.visibility !== "visible") return false;
  if (style.opacity < 0.1) return false;
  if (
    elem.offsetWidth +
      elem.offsetHeight +
      elem.getBoundingClientRect().height +
      elem.getBoundingClientRect().width ===
    0
  ) {
    return false;
  }
  const elemCenter = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
  };
  if (elemCenter.x < 0) return false;
  if (
    elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
  )
    return false;
  if (elemCenter.y < 0) return false;
  if (
    elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  )
    return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while ((pointContainer = pointContainer.parentNode));
  return false;
}
//
// isElementVisible ?
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// autoselect virus mode
//
console.log("😛 autoselect virus mode");
let textContainedInButtonToClick = "VIRUS";
let gameSelectDiv = document.getElementById("gamemodes");
//console.log('children')
for (let i = 0; i < gameSelectDiv.children.length; i++) {
  //console.log('# element n ' + i + ' :')
  let element = gameSelectDiv.children[i];
  let innerHTML = element.innerHTML;
  //console.log(innerHTML);
  if (innerHTML.includes(textContainedInButtonToClick)) {
    setTimeout(() => {
      element.click();
    }, 500);
  }
}
//
// autoselect virus mode
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// get player name
//
setInterval(() => {
  let playerNameInputDiv = document.getElementById("nick");
  if (playerNameInputDiv) {
    player.name = document.getElementById("nick").value;
  } else {
  }
}, 1000);
//
// get player name
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// autoplay
//
console.log("😛 autoplay in 2s");
setTimeout(() => {
  document.getElementById("playBtn").click();
}, 2000);
//
// autoplay
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// autoreload
//
console.log("😛 autoreload enabled");
setInterval(() => {
  let stats = document.getElementById("stats");
  if (isElementVisible(stats)) {
    location.reload();
  }
}, 1000);
//
// autoreload
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// chat
//
// * display a chat message ... ready to be sent
function chat(inputId, txt) {
  let chatBox = document.getElementById(inputId);
  if (chatBox) {
    chatBox.value = txt;
    pressEnter(inputId);
    setTimeout(() => {
      pressEnter(inputId);
    }, 300);
    setTimeout(() => {
      let canvasElement = document.getElementById("canvas");
      canvasElement.focus();
    }, 600);
  }
}

// * simulate enter key
function pressEnter(id) {
  let chatBox = document.getElementById(id);
  if (chatBox) {
    setTimeout(() => {
      const event = new KeyboardEvent("keydown", {
        view: window,
        keyCode: 13,
        bubbles: true,
        cancelable: true,
      });

      chatBox.dispatchEvent(event);
    }, 100);

    setTimeout(() => {
      const event = new KeyboardEvent("keyup", {
        view: window,
        keyCode: 13,
        bubbles: true,
        cancelable: true,
      });

      chatBox.dispatchEvent(event);
    }, 200);
  }
}
//
// * send chat message
setTimeout(() => {
  let txts = [
    "Chalu ! ChaChaCha !",
    "Chalu ! ChaOui",
    "Chalu ! A Cha Oui Ché Chouette !",
    "Chalu ! Che Chui le ChaMinou !",
  ];
  let txt = txts[Math.floor(Math.random() * 4)];
  chat("chat_textbox", txt);
}, 5000);
//
// chat
//                                                                    //
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//                                                                    //
// destroy adds
//
// * iframes
setInterval(() => {
  let i, frames;
  frames = document.getElementsByTagName("iframe");
  if (frames.length < 1) return;
  console.log("😜 <" + frames.length + "> frames removed");
  for (i = 0; i < frames.length; ++i) {
    frames[i].remove();
  }
}, 1000);

// * destroy aipBranding div
setInterval(() => {
  let div = document.getElementById("aipBranding");
  if (div) {
    console.log("😛 aipBranding div removed");
    div.remove();
  }
  div = document.getElementById("divFullscreenLoading");
  if (div) {
    console.log("😛 divFullscreenLoading div removed");
    div.remove();
  }
  div = document.getElementById("preroll");
  if (div) {
    console.log("😜 preroll div removed");
    div.remove();
  }
}, 1000);
//
// destroy adds
//                                                                    //
/////////////////////////////////////////////////////////////////////////
