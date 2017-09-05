var Helpers = require('./helpers.js');

module.exports = {
    train: function (formatted, action, bot, channel, params) {

        var trainApi = 'http://api.trafikinfo.trafikverket.se/v1.2/data.json';
        var location;
        var toLocation;
        var toLocationLong;

        if (formatted.indexOf(" ") === -1) { //TODO 
            bot.postMessage(channel, "Felaktigt kommando.", params);
            return;
        }

        switch (action) {
            case 'JKPG':
                location = 'JÃ¶';
                toLocation = 'V';
                toLocationLong = 'VÃ¶rnamo'
                action = 'JÃ¶nkÃ¶ping';
                break;
            case 'VNMO':
                toLocation = 'JÃ¶';
                toLocationLong = 'JÃ¶nkÃ¶ping'
                location = 'V';
                action = 'VÃ¤rnamo';
                break;
            default:
                toLocation = 'JÃ¶';
                toLocationLong = 'JÃ¶nkÃ¶ping'
                location = 'V';
                action = 'VÃ¤rnamo';
                //bot.postMessage(channel, "Finns ingen matchande plats!", { icon_emoji: ":station:" });

                break;
        }

        var response = '---TÃ¥g frÃ¥n ' + action + '---';
        var trains = Helpers.getTrains(location, trainApi);
        
        for (var i = 0; i < trains.RESPONSE.RESULT[0].TrainAnnouncement.length; i++) {
            if (trains.RESPONSE.RESULT[0].TrainAnnouncement[i].ToLocation[0].LocationName == toLocation) {
                response += '\n Till ' + toLocationLong + ' : ' + trains.RESPONSE.RESULT[0].TrainAnnouncement[i].AdvertisedTimeAtLocation.split('T').pop();
            }
        };
        response += '\n -------------------------';
        bot.postMessage(channel, response, params);
    }
}