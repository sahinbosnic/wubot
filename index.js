// https://www.npmjs.com/package/xmlhttprequest
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// https://www.npmjs.com/package/slackbots
var SlackBot = require('slackbots');

// Settings file for the bot
var Settings = require('./appsettings.json');

var BookedRoom = require('./bookedroom.js');

var Helpers = require('./helpers.js');

var Train = require('./train.js');



//////////// Setup /////////////////

// Add a bot https://my.slack.com/services/new/bot and put the token.
var bot = new SlackBot({
    token: Settings.botToken, 
    name: 'Wubot'
});

var defaultMonkey = Settings.defaultIcon;



/////////////// Events ////////////////////
    
bot.on('start', function () {
    // More information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        icon_emoji: ':monkey_face:'
    };

    // Listens for a message event in any channel the bot is member.
    bot.on('message', function (data) {
        // All ingoing events https://api.slack.com/rtm 
        var channel = data.channel;
        var message = data.text;

        if (message !== undefined && data.user !== undefined) {
            var formatted = message.toLowerCase().trim();

            // If the message is prefixed, continue with switch
            if (formatted.slice(0, 1) === Settings.prefix) {
                
                var args = formatted.split(" ");
                var command = args[0].slice(1, args[0].length);

                // Run if action is present
                if (args[1] != undefined) {
                    var action = args[1].toUpperCase();
                }         

                // Take commands that were prefixed with ?
                switch (command) {
                    case "sal":
                        BookedRoom.bookedRoom(formatted, action, bot, channel, params);
                        break;
                    case "help":
                        bot.postMessage(channel, "'?sal <klass>' - kollar vilken sal som är bokad för klass.\n'?help' - Tar fram detta meddelandet.", params);
                        break;

                    case "train":
                        Train.train(action, bot, channel, params);
                        break;
                    default:
                        bot.postMessage(channel, "Finns inget matchande kommando!", { icon_emoji: ":x:" });
                        break;
                }
            }

            // Words that the bot listens for and reacts to
            if (formatted.indexOf("java ") !== -1) { //TODO Fix so that if the next letter after the word is not a space, return without the bot posting a message.
                params.icon_emoji = getRandomMonkey();
                bot.postMessage(channel, "java...", params);
                params.icon_emoji = defaultMonkey;
                return;
            }

            if (formatted.indexOf("php ") !== -1) {
                params.icon_emoji = getRandomMonkey();
                bot.postMessage(channel, "php...", params);
                params.icon_emoji = defaultMonkey;
                return;
            }
            // Gives a link to "let me google it for you" 
            if (formatted.indexOf("hur ") !== -1) {
                var q = encodeURIComponent(data.text);
                bot.postMessage(channel, 'http://lmgtfy.com/?q=' + q, params);
                return;
            }
        }

    });
});

