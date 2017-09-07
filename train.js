﻿var Helpers = require('./helpers.js');

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
                location = 'Jö';
                toLocation = 'V';
                toLocationLong = 'Värnamo'
                action = 'Jönköping';
                break;
            case 'VNMO':
                toLocation = 'Jö';
                toLocationLong = 'Jönköping'
                location = 'V';
                action = 'Värnamo';
                break;
            default:
                //toLocation = 'Jö';
                //toLocationLong = 'Jönköping'
                //location = 'V';
                //action = 'Värnamo';
                //console.log(action + "default")
                bot.postMessage(channel, "Finns ingen matchande plats!", { icon_emoji: ":station:" });
                action = 'Värnamo';
                break;
        }

        var response = '---Tåg från ' + action + '---';
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