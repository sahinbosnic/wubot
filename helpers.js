// https://www.npmjs.com/package/xmlhttprequest
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    httpGet: function (theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    },
    addZero: function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },
    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomMonkey: function () {
        switch (this.randomIntFromInterval(0, 2)) {
            case 0:
                return ":see_no_evil:";
            case 1:
                return ":hear_no_evil:";
            case 2:
                return ":speak_no_evil:";
        }
    },
    getTrains: function (station, trainApi) {
        var date = new Date();
        var timeFrom = date.toLocaleTimeString()
        var xml = new XMLHttpRequest();
        xml.open("POST", trainApi, false);
        xml.setRequestHeader('Content-Type', 'text/xml');
        var data = '<REQUEST>' +
            '<LOGIN authenticationkey="7c616dd6b1a7439094089f68142e835a" />' +
            '<QUERY objecttype="TrainAnnouncement" orderby="AdvertisedTimeAtLocation">' +
            '<FILTER>' +
            '<AND>' +
            '<EQ name="ActivityType" value="Avgang" />' +
            '<EQ name="LocationSignature" value="' + station + '" />' +
            '<OR>' +
            '<AND>' +
            '<GT name="AdvertisedTimeAtLocation" value="' + timeFrom + '" />' +
            '<LT name="AdvertisedTimeAtLocation" value="$dateadd(12:00:00)" />' +
            '</AND>' +
            '</OR>' +
            '</AND>' +
            '</FILTER> ' +
            '<INCLUDE>AdvertisedTrainIdent</INCLUDE>' +
            '<INCLUDE>AdvertisedTimeAtLocation</INCLUDE>' +
            '<INCLUDE>TrackAtLocation</INCLUDE>' +
            '<INCLUDE>ToLocation</INCLUDE>' +
            '</QUERY>' +
            '</REQUEST>';
        xml.send(data);
        return JSON.parse(xml.responseText);
    },
    blockquoteBuilder: function (title, command, description) {

        if (title !== 'null') {
            return '>>> *' + title + '*\n`' + command + '` - ' + description + '\n';
        }

        if (title === 'null') {
            return '`' + command + '` - ' + description + '\n';
        }

    },
    helpDescriptionBuilder: function (descriptions) {
        var text = '>>>';

        for (var i = 0; i < descriptions.length; i++) {
            text += '*' + descriptions[i].category + '*\n';
            for (var y = 0; y < descriptions[i].commands.length; y++) {
                text += '`' + descriptions[i].commands[y].command + '` - ' + descriptions[i].commands[y].description + '\n';
            }
        }
        return text;
    }
}