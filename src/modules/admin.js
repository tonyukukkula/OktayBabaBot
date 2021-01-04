var { passwd } = require('./admins');
var fs = require('fs');

ADMIN = {
    name: "isim",
    surname: "soyisim",
    id: "id"
};
function idDondur(msg) {
    var sonuc = 0;
    var obj = JSON.parse(fs.readFileSync('admin.json', 'utf8'));
    if(msg.from.id == obj.ADMINS[msg.from.username].id){
        sonuc = msg.from.id;
    }
    return sonuc;
}
function panel(bot, msg, match) {
    if (match[1] == passwd)
        admin(bot, msg, match);
    else if (match[1] == 'quit') {
        if (msg.from.id == idDondur(msg))
            quit(bot, msg);
        else
            bot.sendMessage(msg.chat.id, "bu komutu kullanabilmek için admin yetkisine sahip olmanız gerekli", { reply_to_message_id: msg.message_id })
    }
    else if (match[1] == 'yetkiler') {
        if (msg.from.id == idDondur(msg))
            yetkiler(bot, msg);
        else
            bot.sendMessage(msg.chat.id, "bu komutu kullanabilmek için admin yetkisine sahip olmanız gerekli", { reply_to_message_id: msg.message_id })
    }
}
function admin(bot, msg, match) {
    //duplicated adminleri belirleyip silmek lazım.
    var obj = require('../admin.json');
    var chatId = msg.chat.id;
    if (match[1] == passwd) {
        ADMIN.id = msg.from.id;
        ADMIN.name = msg.from.first_name;
        ADMIN.surname = msg.from.last_name;
        //burada o duplicated metodu gelmeli
        obj.ADMINS.push(ADMIN);

        var kayit_element = JSON.stringify(obj, null, 4);
        fs.writeFile("admin.json", kayit_element, "utf-8", function (err) {
            if (err) {
                bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu");
            } else {//buraya else if diyip önceden kayıt yapanın; kayıt yaptıramayacağının denmesi gerek
                console.log("JSON file(admin) has been saved.");
                bot.sendMessage(chatId, "Eline sağlık, ADMİN kaydı tamamlanmıştır");
            }
        });
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
function changePasswd(bot, msg, match) {
    var chatId = msg.chat.id;
    passwd = match;
    bot.sendMessage(chatId, 'Şifre Değiştirildi..');
}
module.exports = { panel };