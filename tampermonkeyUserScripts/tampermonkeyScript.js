// ==UserScript==
// @name         agar.team.chaminou
// @namespace    https://mysupercomputer.fun
// @version      0.1
// @description  helper for agar.team (may work with other agar... add mote @match) virus mode
// @author       chaminou
// @match        https://agar.team
// @icon         https://img2.freepng.fr/20180622/jip/kisspng-agar-io-synonyms-and-antonyms-android-agario-5b2daa8b455d71.5100127615297194352842.jpg
// @grant        none
// @license      MIT
// ==/UserScript==

// This script is designed to help with agar.team virus mode :
// - ad remover
// - highlight virus
// - auto run and reload
// - zen view
// - share position with other player using the script !
// - transparent circles

// tested on chrome and safari osx, up to date may 2022, Tampermonkey, shoud work with any platform but not tested...
// request ES6 browser like latest (as of may 2022) chrome / safari / firefow... (with class, let, const...)
// the share position use a node server on glitch. you can fork the glitch project... if you want to share your
// position with your friends on your own server. try glitch : it's very easy and convenient !


(function() {
    'use strict';


    /////////////////////////////////////////////////////////////////
    //                                                            //
    // BBSocket WEBSOCKET CLIENT INTERFACE
    //
    //
    // usage :
    //    let com = new BBSocket('wss://agar-help-server.glitch.me')
    //      .onConnect( () => {
    //        com.sendMessage({ text: 'Hello !', from: 'Mac Donald' });
    //      })
    //      .onMessage( msg => {
    //        console.log('💥 "' + msg.text + '" received from "' + msg.from + '"')
    //      })
    //
    class BBSocket {
        //
        constructor(webServerURL) {
            this.webServerURL = webServerURL
            this.websocketServer = undefined;
            this.onConnectClosure = event => {
                console.log('🥴 #warning# BBSocket : no onConnect defined ');
            };
            this.onMessageClosure = event => {
                console.log('🥴 #warning# BBSocket : no onMessage defined ');
            };

            this.connect();
        }

        //
        onConnect(onConnectClosure) {
            if (onConnectClosure) this.onConnectClosure = onConnectClosure;
            return this;
        }

        //
        onMessage(onMessageClosure) {
            if (onMessageClosure) this.onMessageClosure = onMessageClosure;
            return this;
        }
        
        //
        sendMessage(msg) {
            this.websocketServer.send(JSON.stringify(msg));
            return this;
        }

        //
        // all begin here... by a connection to server....
        connect() {
            this.websocketServer = new WebSocket(this.webServerURL);

            // OPEN
            this.websocketServer.onopen = event => {
                this.onConnectClosure(event);
                return this;
            };

            // MESSAGE
            this.websocketServer.onmessage = event => {
                this.onMessageClosure(JSON.parse(event.data));
                return this;
            };

            // CLOSE
            this.websocketServer.onclose = event => {
                console.log(event.message);
                console.log('... connection closed 💥');
                console.log('🤓 try to reconnect');
                let websocketServer = this;
                setTimeout(function () {
                    websocketServer.connect();
                }, 1000);
            };

            // ERROR
            this.websocketServer.onerror = error => {
                console.error('🍄 Socket encountered error: ', error.message);
                console.log('🦊 try to close socket !');
                this.websocketServer.close();
            };
        }

        //
        static test(webServerURL) {
            let com = new BBSocket(webServerURL)
            .onConnect(() => {
                com.sendMessage({ text: 'Hello !', from: webServerURL });
            })
            .onMessage(msg => {
                console.log('💥 "' + msg.text + '" send to and received from "' + msg.from + '"');
            });
        }
    }
    //
    // BBSocket WEBSOCKET CLIENT INTERFACE
    //                                                            \\
    ///////////////////////////////////////////////////////////////\\


    /////////////////////////////////////////////////////////////////
    //                                                            //
    // CodeRunner
    //
    class CodeRunner {
        //
        constructor(serverURL, fileName) {
            this.serverURL = serverURL
            this.fileName = fileName
            this.onLoadClosure = undefined
            this.code = ''
            this.load(this.serverURL)
        }

        //
        resetTimers() {
            let maxId = setTimeout(function () {}, 0);

            for (var i = 0; i < maxId; i += 1) {
                clearTimeout(i);
            }
            return this
        }

        //
        run() {
            //this.resetTimers()
            localStorage.setItem("agar-team-chaminou-code", this.code);
            try {
                Function(this.code)(window);
            } catch (err) {
                console.error(err);
            }
            return this
        }

        //
        load(serverURL) {
            let com = new BBSocket(serverURL)
            .onConnect(() => {
                console.log("###### code request to the server")
                com.sendMessage({request:'loadCode',fileName:this.fileName});
            })
            .onMessage(msg => {
                if (msg.answer) {
                    this.code = msg.code;
                    console.log('########## CODE LOADED ######### :')
                    console.log(this.code)
                    if (this.onLoadClosure) this.onLoadClosure()
                }
            });
            return this
        }

        //
        onLoad(closure) {
            this.onLoadClosure = closure
        }
    }
    //
    // CodeRunner
    //                                                            \\
    ///////////////////////////////////////////////////////////////\\


    /////////////////////////////////////////////////////////////////
    //                                                            //
    // MAIN
    //
    window.BBSocket = BBSocket

    let script = new CodeRunner('wss://agar-help-server.glitch.me', 'tampermonkeyUserScripts/agarTeamScript.js')
    script.onLoad( ()=> {
        script.run()
    })
    //
    // MAIN
    //                                                            \\
    ///////////////////////////////////////////////////////////////\\

})();