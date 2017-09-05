// https://www.npmjs.com/package/slackbots
var SlackBot = require('slackbots');

// Settings file for the bot
var Settings = require('./appsettings.json');

var BookedRoom = require('./bookedroom.js');

var Helpers = require('./helpers.js');

var Train = require('./train.js');

var Sup = require('./sup.js');

var Links = require('./links.js');


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
                        var bookedRoomDescription = Helpers.blockquoteBuilder('Bokad sal', '?sal <params>', 'Kollar vilken sal som är bokad baserat på params. tex. `wu16`');
                        var trainDescription = Helpers.blockquoteBuilder('Tågresa', '?train <params>', 'Skriv antingen `VNMO` eller `JKPG` för att få rätt tid.');
                        var supDescription = Helpers.blockquoteBuilder('Hälsning', '?sup <username>', 'Skriv in en användare så hälsar Wubot på hen.');
                        var helpDescription = Helpers.blockquoteBuilder('Hjälp', '?help', 'Tar fram detta meddelandet.');

                        
                        bot.postMessage(channel, bookedRoomDescription, params);
                        bot.postMessage(channel, trainDescription, params);
                        bot.postMessage(channel, supDescription, params);
                        bot.postMessage(channel, helpDescription, params);
                        
                        break;
                    case "train":
                        Train.train(formatted, action, bot, channel, params);
                        break;
                    case "jquery":
                        bot.postMessage(channel, "http://io.gwiddle.co.uk/needsmorejquery/", params);     
                    case "sup":    
                        Sup.sup(formatted, action, bot, channel, params);                       
                        break;
                    case "links":
                        Links.getLinks(bot, channel, params);
                        break;     
                    case "git":
                        bot.postMessage(channel, Helpers.blockquoteBuilder('Wubot på GitHub','https://github.com/RarexWU16/wubot/tree/dev', 'Kolla gärna på issues!'), params);
                        break;
                    default:
                        bot.postMessage(channel, "Finns inget matchande kommando!", { icon_emoji: ":x:" });
                        break;
                }
            }

            // Words that the bot listens for and reacts to
            if (formatted.indexOf("java ") !== -1) { //TODO Fix so that if the next letter after the word is not a space, return without the bot posting a message.
                params.icon_emoji = Helpers.getRandomMonkey();
                bot.postMessage(channel, "java...", params);
                params.icon_emoji = defaultMonkey;
                return;
            }

            if (formatted.indexOf("php ") !== -1) {
                params.icon_emoji = Helpers.getRandomMonkey();
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

