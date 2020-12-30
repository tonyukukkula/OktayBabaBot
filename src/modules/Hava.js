var request = require('request');
function hava(bot, msg, match){
    var chatId = msg.chat.id;
    var sehir = match[1];
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + sehir + ',tr&APPID=6c12608b9fa38abd4deb485a45bc0f17&units=metric';
    request(url, function (error, response, body) {
        bot.sendMessage(chatId, "soruyorum efendim ...")
            .then(function (msg) {
                var res = JSON.parse(body);
                if (res.main['temp'] > 20) {
                    bot.sendMessage(chatId, sehir + ' sıcaklığı: ' + res.main['temp'] + '°C');
                    bot.sendMessage(chatId, 'eccik ince giyin');
                } else if (res.main['temp'] == 20) {
                    bot.sendMessage(chatId, sehir + ' sıcaklığı: ' + res.main['temp'] + '°C');
                    setTimeout(() => { bot.sendMessage(chatId, 'buna ne diyem bilemedim.'); }, 1000, 'funky');
                } else {
                    bot.sendMessage(chatId, sehir + ' sıcaklığı: ' + res.main['temp'] + '°C');
                    bot.sendMessage(chatId, 'eccik kalın giyin');
                }
            });
    });
}
module.exports = {hava};