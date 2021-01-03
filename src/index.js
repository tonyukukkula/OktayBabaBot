var TelegramBot = require('node-telegram-bot-api');
var token = '806831852:AAGwTTqWh8nPyoGnfHI2BcZu53i7UwFaGis';
var bot = new TelegramBot(token, { polling: true });

const { ezanan } = require('./modules/Ezanan');
const { kayıt } = require('./modules/Kayit');
const { film, filma } = require('./modules/Filmler');
const { tekrar, sa, naptin, napıyon, naptın } = require('./modules/Sohbet');
const { komutlar } = require('./modules/Komutlar');
const { hava } = require('./modules/Hava');
const { etkinlik } = require('./modules/Etkinlik');
const { admin } = require('./modules/admin');

bot.on("polling_error", (msg) => console.log(msg));//hata kaynağını daha rahat çözmek için

bot.onText(/\/kayıt (.+)/, function (msg, match) {
    kayıt(bot, msg, match);
});

bot.onText(/\/admin (.+)/, function (msg, match) {
    admin(bot, msg, match);
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
