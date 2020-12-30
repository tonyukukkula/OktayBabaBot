var TelegramBot = require('node-telegram-bot-api');
var token = '806831852:AAGwTTqWh8nPyoGnfHI2BcZu53i7UwFaGis';
var bot = new TelegramBot(token, { polling: true });
var request = require('request');
var fs = require('fs');
function bol(str){
    var isim_soyisim = str.split(/\s+/);
    return isim_soyisim;
}

bot.onText(/\/komutlar/, function (msg) {
    var chatId = msg.chat.id;
    var yardım = "Komut Listesi==>\n" +
        "Kayıt için /kayıt İsim(ler)-Soyisim-MailAdresi şeklinde kayıt yapabilirsiniz" +
        "/tekrar <<tekrar edilmesi gereken şiy>>\nbu komut ile bota istediğiniz küfrü tekrar ettirebilirsiniz\n" +
        "/etkinlik çok yakında hizmete girecek, apisini yazalım hele\n" +
        "/sa botla selam alıp vermeniz için\n" +
        "/naptın ve /naptin botun halini hatrını sorabilmeniz için\n" +
        "/napıyon botun yaşayıp yaşamadığını sorgulamak için\n" +
        "naptın, naptin veya napıyon yazmanız yeterli /'a gerek yok :)\n" +
        "/hava <<sehir>> bulunduğunuz ilin güncel hava sıcaklığını sorgulamak için\n" +
        "/film <<film>> filmler üzerine kültürel bir tartışmanın ortasında mısınız?" +
        "film ile alakalı bir şeyler mi bilmek istiyorsunuz? o zaman sorun yahu!\n" +
        "/filma <<film>> tartışma çok mu derin? bir de bunu dene!\n" +
        "/ezanan ankara günlük ezan saatleri, cumayı kaçırmayalım :)\n";
    bot.sendMessage(chatId, yardım);
});

bot.onText(/\/ezanan/, function (msg) {
    var chatId = msg.chat.id;
    var url = 'https://ezanvakti.herokuapp.com/vakitler?ilce=9206';
    request(url, function (error, response, body) {
        var res = JSON.parse(body);
        bot.sendMessage(chatId,
            'hicri : ' + res[0].HicriTarihUzun +
            '\n\t\t\timsak : ' + res[0].Imsak +
            '\n\t\t\t\tgüneş : ' + res[0].Gunes +
            '\n\t\t\t\t\töğle : ' + res[0].Ogle +
            '\n\t\t\t\t\tikindi : ' + res[0].Ikindi +
            '\n\t\t\t\takşam : ' + res[0].Aksam +
            '\n\t\t\tyatsı : ' + res[0].Yatsi
        );
    });
});
bot.onText(/\/tekrar (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    var tekrar = match[1];
    bot.sendMessage(chatId, tekrar);
    setTimeout(() => { bot.sendMessage(chatId, 'bana bunu neden dedirttin olm'); }, 1900, 'funky');
});
bot.onText(/\/kayıt (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    var bilgiler = match[1];
    var obje = bol(bilgiler);
    data={
        name: "isim",
        surname: "soyisim",
        e_posta: "bolum",
        telefon: "mail"
    };
    if(obje.length == 5){
        data.name = obje.slice(0, 3)[0]+ " " + obje.slice(0, 3)[1];
        data.surname = obje.slice(0, 3)[2];
        data.e_posta=obje[3];
        data.telefon=obje[4];
    } //2ismi var demektir  
    else if(obje.length == 4){
        data.name = obje.slice(0, 2)[0];
        data.surname = obje.slice(0, 2)[1];
        data.e_posta=obje[2];
        data.telefon=obje[3];
    } // tek ismi var demektir
    var kayit_element=JSON.stringify(data);
    fs.appendFile("student.json", kayit_element + "\n", "utf-8", function (err) {
        if (err) {
            bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu");
        } else {
            console.log("JSON file has been saved.");
            bot.sendMessage(chatId, "Eline sağlık, kayıt tamamlanmıştır");
        }
    });
});
bot.onText(/\/etkinlik/, function (msg) {
    var chatId = msg.chat.id;
    var etkinlik = 'etkinlik apisi daha azır değil bea'/*buradan etkinlik apisinden çekip yazdırcaz*/;
    bot.sendMessage(chatId, etkinlik);
});
bot.onText(/\/sa/, function (msg) {
    var chatId = msg.chat.id;
    var cvp = 'as reis';
    bot.sendMessage(chatId, cvp);
});
bot.onText(/naptın/, function (msg) {
    var chatId = msg.chat.id;
    var cvp = 'yaşıyoruz reis senden?';
    bot.sendMessage(chatId, cvp);
});
bot.onText(/napıyon/, function (msg) {
    var chatId = msg.chat.id;
    var cvp = 'yaşıyom';
    bot.sendMessage(chatId, cvp);
    bot.sendMessage(chatId, 'sen?');
});
bot.onText(/naptin/, function (msg) {
    var chatId = msg.chat.id;
    var cvp = 'yaşıyoruz reis senden?';
    bot.sendMessage(chatId, cvp);
});
bot.onText(/\/hava (.+)/, function (msg, match) {
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
});
bot.onText(/\/film (.+)/, function (msg, match) {
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
});
bot.onText(/\/filma (.+)/, function (msg, match) {
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
});
