var { passwd } = require('./admins');
var fs = require('fs');
var data1 = require('../admin.json');

function idDondur(msg) {
    var sonuc = 0;
    var obj = JSON.parse(fs.readFileSync('admin.json', 'utf8'));
    if (msg.from.id == obj.ADMINS[msg.from.username].id) {
        sonuc = msg.from.id;
    }
    return sonuc;
}

function isContains(data, value) {
    let contains = false;
    Object.keys(data).some(key => {
        contains = typeof data[key] === 'object' ? isContains(data[key], value) : data[key] === value;
        return contains;
    });
    return contains;
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
    } else if (match[1].indexOf('p:') == 0) {
        if (isContains(data1, msg.from.id)) {
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
                bot.sendMessage(chatId, "Eline sağlık, kayıt tamamlanmıştır");
            }
        });
    })
}

function admin(bot, msg, match) {
    var chatId = msg.chat.id;
    if (match[1] == passwd) {
        if (!isContains(data1, msg.from.id)) {
            yazdirAdminJSON(bot, msg);
            bot.sendMessage(chatId, "Gardeşim daha kaç kere admin olcan?")
        } else {
            bot.sendMessage(chatId, "Admin girişi başarılı.");
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