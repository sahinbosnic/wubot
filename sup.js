module.exports = {
    sup: function (formatted, action, bot, channel, params) {

        if (formatted.indexOf(" ") === -1) {
            bot.postMessage(channel, "Felaktigt kommando.", params);
            return;
        }

        var users = bot.getUsers();
        var user = users._value.members.filter(function (x) {
            if (x.name.indexOf(action.toLowerCase()) !== -1) {
                return x;
            }
        });

        if (user.length <= 0) {
            bot.postMessage(channel, "Ingen användare med det namnet!", params);
            return;
        }

        var message = '<@' + user[0].id + '|' + user[0].name + '> Whats up?!';

        bot.postMessage(channel, message, { icon_emoji: ":wave:" });
    }
}