
module.exports = {
    getLinks: function(channel, params)
    {
        var links = "************* \n" +
                    "MS Imagine: https://goo.gl/GxQPQF \n" +
                    "Discord: *insert discord here* \n" + 
                    "Ping Pong: https://goo.gl/Ldxovo \n" +
                    "Codecademy: https://goo.gl/OTm7rG \n" + 
                    "Codepen: https://goo.gl/IuqWJ \n" +
                    "************* \n"
       bot.postMessage(channel, links, params);    
    }
}