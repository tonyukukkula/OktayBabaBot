var request = require('request');


function ezanan(bot, msg){

    var chatId = msg.chat.id;
    var url = 'https://ezanvakti.herokuapp.com/vakitler?ilce=9206';
    var icerik, res;
    
    request(url, function (error, response, body) {

        res = JSON.parse(body);

        icerik = 'hicri  : ' + res[0].HicriTarihUzun +
                '\nimsak  : ' + res[0].Imsak +
                '\ngüneş  : ' + res[0].Gunes +
                '\nöğle   : ' + res[0].Ogle +
                '\nikindi : ' + res[0].Ikindi +
                '\nakşam  : ' + res[0].Aksam +
                '\nyatsı  : ' + res[0].Yatsi;

        bot.sendMessage(chatId, icerik);
    });
    
    bot.sendMessage(chatId, "Allah kabul etsin gülüm", { reply_to_message_id: msg.message_id });
}


module.exports = {ezanan};
