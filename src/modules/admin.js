var { passwd } = require('./admins');
var fs = require('fs');
function isContains(data, value) {
    let contains = false;
    Object.keys(data).some(key => {
        contains = typeof data[key] === 'object' ? isContains(data[key], value) : data[key] === value;
         return contains;
    });
    return contains;
}

function panel(bot, msg, match) {
    var data = JSON.parse(fs.readFileSync('admin.json', 'utf-8'));
    if (match[1] == passwd)
        admin(bot, msg, match);
    else if (match[1] == 'quit') {
        if (isContains(data,msg.from.id))
            quit(bot, msg);
        else
            bot.sendMessage(msg.chat.id, "bu komutu kullanabilmek için admin yetkisine sahip olmanız gerekli", { reply_to_message_id: msg.message_id })
    }
    else if (match[1] == 'yetkiler') {
        if (isContains(data,msg.from.id)){
            yetkiler(bot, msg);
        }
        else  {
            bot.sendMessage(msg.chat.id, "bu komutu kullanabilmek için admin yetkisine sahip olmanız gerekli", { reply_to_message_id: msg.message_id })
        }
    } else if (match[1].indexOf('p:') == 0) {
        if (isContains(data,msg.from.id)) {
            passwd = match[1].substring(2);
            bot.sendMessage(msg.chat.id, "Şifre değiştirildi.");
        } else {
            bot.sendMessage(msg.chat.id, "Önce admin yetkisine sahip olmalısınız.");
        }
    } else {
        var cvp = 'Gardeşim senin amacın ne? ne bi parola giriyon ne bir komut!?';
        bot.sendMessage(msg.chat.id, cvp);
    }
}

function admin(bot, msg) {
    var data = JSON.parse(fs.readFileSync('admin.json', 'utf-8'));
    var chatId = msg.chat.id;
    if (!isContains(data,msg.from.id)) {
        yazdirAdminJSON(bot, msg);
    } else {
        bot.sendMessage(chatId, "Gardeşim daha kaç kere admin olcan?")
    }
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

    fs.readFile('admin.json', function (err, datA) {
        if (err)
            bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu dosya okumada");
        var json = JSON.parse(datA);
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
                ['/panel quit']
            ]
        })
    };
    bot.sendMessage(chatId, yardım, opts);
}
// Şifre Değiştir
function changePasswd(bot, msg, match) {
    var chatId = msg.chat.id;
    passwd = match;
    bot.sendMessage(chatId, 'Şifre Değiştirildi..');
}
module.exports = { panel };