var { passwd } = require('./admins');
var fs = require('fs');
//bunda hata var
function isContains(value) {
    var hasMatch = false;
    var json = require('../admin.json');
    for (var index = 0; index < json.ADMINS.length; ++index) {
        if (json.ADMINS.id == value) {
            hasMatch = true;
            break;
        }
    }
    return hasMatch;
}

function panel(bot, msg, match) {
    if (match[1] == passwd)
        admin(bot, msg, match);
    else if (match[1] == 'quit') {
        if (isContains(msg.from.id))
            quit(bot, msg);
        else
            bot.sendMessage(msg.chat.id, "bu komutu kullanabilmek için admin yetkisine sahip olmanız gerekli", { reply_to_message_id: msg.message_id })
    }
    else if (match[1] == 'yetkiler') {
        if (isContains(msg.from.id))
            yetkiler(bot, msg);
        else
            bot.sendMessage(msg.chat.id, "bu komutu kullanabilmek için admin yetkisine sahip olmanız gerekli", { reply_to_message_id: msg.message_id })
    } else if (match[1].indexOf('p:') == 0) {
        if (isContains(msg.from.id)) {
            passwd = match[1].substring(2);
            bot.sendMessage(msg.chat.id, "Şifre değiştirildi.");
        } else {
            bot.sendMessage(msg.chat.id, "Önce admin yetkisine sahip olmalısınız.");
        }
    } else {
        admin(bot, msg, match);
    }//elseif event

}
function yazdirAdminJSON(bot, msg) {
    ADMIN = {
        name: "isim",
        surname: "soyisim",
        id: "id"
    };
    if (msg.from.id != null)
        ADMIN.id = msg.from.id;

    if (msg.from.first_name != null)
        ADMIN.name = msg.from.first_name;

    if (msg.from.last_name != null)
        ADMIN.surname = msg.from.last_name;
    else
        ADMIN.surname = "tanımsız";

    var chatId = msg.chat.id;

    fs.readFile('admin.json', function (err, data) {
        if (err)
            bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu dosya okumada");
        var json = JSON.parse(data);
        json.ADMINS.push(ADMIN);
        fs.writeFile("admin.json", JSON.stringify(json, null, 4), function (err) {
            if (err) {
                bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu dosya yazmada");
            } else {
                console.log("JSON file(admin) has been saved.");
                bot.sendMessage(chatId, "Eline sağlık, admin kaydın tamamlanmıştır");
            }
        });
    })
}

function admin(bot, msg, match) {
    var chatId = msg.chat.id;
    if (match[1] == passwd) {
        if (!isContains(msg.from.id)) {
            yazdirAdminJSON(bot, msg);
        } else {
            bot.sendMessage(chatId, "Gardeşim daha kaç kere admin olcan?")
        }
    } else {
        var cvp = 'Gardeşim senin amacın ne? ne bi parola giriyon ne bir komut!?';
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
        "/panel p: Parolayı değiştir.\n" +
        "/quit Çıkış yap";
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['/event'],
                ['/panel p:'],
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