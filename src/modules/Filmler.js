var request = require('request');
function film(bot, msg, match){
    var chatId = msg.chat.id;
    var film = match[1];
    var url = 'http://www.omdbapi.com/?apikey=d361e4d8&t=' + film;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bot.sendMessage(chatId, film + ' adlı şeyi arıyom ...', { parse_mode: 'Markdown' })
                .then(function (msg) {
                    var res = JSON.parse(body);
                    if (res.Poster != null) {
                        bot.sendPhoto(chatId, res.Poster,
                            {
                                caption: 'Sonuç:(özet güzel ama ingilicce)' +
                                    '\nBaşlık: ' + res.Title +
                                    '\nYıl: ' + res.Year +
                                    '\nYaş-Kategorisi: ' + res.Rated +
                                    '\nGörücüye Çıkma: ' + res.Released +
                                    '\nŞu kadar dakika: ' + res.Runtime +
                                    '\nKategori:' + res.Genre +
                                    '\nÖzeti:\n' + res.Plot
                            });
                    } else { bot.sendMessage(chatId, 'gardaş o niy laa'); bot.sendMessage(chatId, 'bulamadım'); }
                })
        }
    });
}
function filma(bot, msg, match){
    var chatId = msg.chat.id;
    var film = match[1];
    var url = 'http://www.omdbapi.com/?apikey=d361e4d8&t=' + film;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bot.sendMessage(chatId, film + ' adlı şeyi arıyom ...', { parse_mode: 'Markdown' })
                .then(function (msg) {
                    var res = JSON.parse(body);
                    if (res.Poster != null) {
                        bot.sendPhoto(chatId, res.Poster,
                            {
                                caption: 'Sonuç:(özet güzel ama ingilicce)' +
                                    '\nBaşlık: ' + res.Title +
                                    '\nYıl: ' + res.Year +
                                    '\nYaş-Kategorisi: ' + res.Rated +
                                    '\nGörücüye Çıkma: ' + res.Released +
                                    '\nŞu kadar dakika: ' + res.Runtime +
                                    '\nKategori:' + res.Genre +
                                    '\nYönetmen: ' + res.Director +
                                    '\nYazar: ' + res.Writer +
                                    '\nOyuncular: ' + res.Actors +
                                    '\nDil: ' + res.Language +
                                    '\nMenşei Ülke: ' + res.Country +
                                    '\nÖdüller: ' + res.Awards +
                                    '\nPuanlar' +
                                    '\n->Metascore: ' + res.Metascore +
                                    '\n->IMDB Toplam Oy: ' + res.imdbVotes +
                                    '\n->IMDB Puan: ' + res.imdbRating +
                                    '\nÖzeti:\n' + res.Plot +
                                    '\nDaha fazlası için:' + res.Website
                            });
                    } else { bot.sendMessage(chatId, 'gardaş o niy laa'); bot.sendMessage(chatId, 'bulamadım'); }
                })
        }
    });
}
module.exports = {film, filma};