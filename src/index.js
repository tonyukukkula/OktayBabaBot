var TelegramBot = require('node-telegram-bot-api');
var token = '806831852:AAGwTTqWh8nPyoGnfHI2BcZu53i7UwFaGis';
var bot = new TelegramBot(token, { polling: true });
var fs = require('fs');

const { ezanan } = require('./modules/Ezanan');
const { kayıt } = require('./modules/Kayit');
const { film, filma } = require('./modules/Filmler');
const { tekrar, sa, naptin, napıyon, naptın } = require('./modules/Sohbet');
const { komutlar } = require('./modules/Komutlar');
const { hava } = require('./modules/Hava');
//const { etkinlik } = require('./modules/Etkinlik');
const { panel } = require('./modules/admin');

bot.on("polling_error", (msg) => console.log(msg));//hata kaynağını daha rahat çözmek için

// bot.onText(/\/etkinlikkaydet (.+)/, function(msg, match) {
//     var file_id = match[1];
//     bot.getFile(file_id, [options]);
//     bot.downloadFile(file_id, "/etkinlikkayitlari");
// }) 

// bot.onText(/\/botonte/, function (msg) {
//     var chatId = msg.chat.id;
//     var obj = JSON.parse(fs.readFileSync('admin.json', 'utf8'));
//     var obj1= JSON.stringify(obj.ADMINS['bilgetonyukuk']);
//     bot.sendMessage(chatId, obj1);
// });

bot.onText(/\/kayıt (.+)/, function (msg, match) {
    kayıt(bot, msg, match);
});

bot.onText(/\/panel (.+)/, function (msg, match) {
    panel(bot, msg, match);
});

bot.onText(/\/komutlar/, function (msg) {
    komutlar(bot, msg);
});

bot.onText(/\/hava (.+)/, function (msg, match) {
    hava(bot, msg, match);
});

bot.onText(/\/tekrar (.+)/, function (msg, match) {
    tekrar(bot, msg, match);
});

bot.onText(/\/etkinlik/, function (msg) {
    etkinlik(bot, msg);
});

bot.onText(/\/sa/, function (msg) {
    sa(bot, msg);
});

bot.onText(/\/naptin/, function (msg) {
    naptin(bot, msg);
});

bot.onText(/\/napıyon/, function (msg) {
    napıyon(bot, msg);
});

bot.onText(/\/naptın/, function (msg) {
    naptın(bot, msg);
});

bot.onText(/\/ezanan/, function (msg) {
    ezanan(bot, msg);
});

bot.onText(/\/film (.+)/, function (msg, match) {
    film(bot, msg, match);
});

bot.onText(/\/filma (.+)/, function (msg, match) {
    filma(bot, msg, match);
});
