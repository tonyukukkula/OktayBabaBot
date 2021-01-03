
const admins = require('../admins');
var fs = require('fs');

const { komutlar } = require('./Komutlar');


function admin(bot,msg, match){
    var chatId = msg.chat.id;
    var parola = match[1];
    
    if(parola == admins.passwd){

        var cvp = 'Admin Girişi başarılı..';
        bot.sendMessage(chatId, cvp);

        bot.onText(/\/quit/, function (msg) {
            quit(bot, msg);
        });
        
        bot.onText(/\/event (.+)/, function (msg, match) {
            event(bot, msg, match);
        });

        bot.onText(/\/passwd (.+)/, function (msg, match) {
            passwd(bot, msg, match);
        });


        bot.onText(/\/yetkiler/, function (msg) {
            yetkiler(bot, msg);
        });


    }else{
        var cvp = 'Geçersiz Parola..';
        bot.sendMessage(chatId, cvp);
    }
    
    
}

function quit(bot,msg){
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Çıkış Yapıldı..');
}
 
// admin komutları
function yetkiler(bot, msg){
=======
const { admins, passwd } = require('./admins');
var fs = require('fs');
const {bol} = require('./Kayit');
const { komutlar } = require('./Komutlar');


function admin(bot, msg, match) {
    var chatId = msg.chat.id;
    var parola = match[1];
// /admin şifre işlem işlem_matchi
    var icerik = bol(parola); //0: şifre, 1: işlem, işlem match.
    
    if (icerik[0] == passwd) {
        //var cvp = 'Admin Girişi başarılı..';
        if(icerik[1] == "quit"){
            quit(bot, msg);
        }else if(icerik[1]=="event"){
            event(bot, msg, icerik[2]);
        }else if(icerik[1]=="passwd"){
            changePasswd(bot, msg, icerik[2]);
        }else if(icerik[1]=="yetkiler"){
            yetkiler(bot, msg);
        }
        //bot.sendMessage(chatId, cvp);
    } else {
        var cvp = 'Geçersiz Parola..';
        bot.sendMessage(chatId, cvp);
    }
}

function quit(bot, msg) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Çıkış Yapıldı..');
}

// admin komutları
function yetkiler(bot, msg) {

    var chatId = msg.chat.id;
    var yardım = "Komut Listesi==>\n" +
        "/event Etkinlik ekle\n" +
        "/passwd Parolayı değiştir.\n" +

        "/quit Çıkış yap" ;
        

        "/quit Çıkış yap";

    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['/event'],
                ['/passwd'],
                ['/quit']
            ]
        })
    };
    bot.sendMessage(chatId, yardım, opts);
}

// Etkinlik dosyasını yükle

function event(bot, msg, match){
    var chatId = msg.chat.id;
    var file_path = match[1];
    var data = bot.getFile(msg.chat.id, file_path);
    var etkinlik = JSON.stringify(data);

    fs.appendFile("etkinlikler.json", kayit_element + "\n", "utf-8", function (err) {
=======
// Burası biraz gereksiz gibi geldi,
// telegram arayüzüden yapabiliriz bunu ve kodları biraz daha profesyonelleştirelim.
function event(bot, msg, match) {
    var chatId = msg.chat.id;
    var file_path = match;
    var data = bot.getFile(msg.chat.id, file_path);
    var etkinlik = JSON.stringify(data);

    fs.appendFile("etkinlikler.json", etkinlik + "\n", "utf-8", function (err) {

        if (err) {
            bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu");
        } else {
            console.log("JSON -etkinlik- file has been saved.");
            bot.sendMessage(chatId, "Etkinlik Eklendi..");
        }
    });

    
   
    };



    // Şifre Değiştir

    function passwd(bot,msg,match){
        var chatId = msg.chat.id;
        var yeni = match[1];
        admins.passwd = yeni;
        bot.sendMessage(chatId, 'Şifre Değiştirildi..');
    }
=======


};



// Şifre Değiştir

function changePasswd(bot, msg, match) {
    var chatId = msg.chat.id;
    passwd = match;
    bot.sendMessage(chatId, 'Şifre Değiştirildi..');
}

module.exports = { admin };

