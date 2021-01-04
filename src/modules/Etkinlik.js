const bol = require('./Kayit');
var fs = require("fs")
data = {
    resim: "path",
    baslik: "baslik",
    icerik: "icerik"
};
/*
function etkinlikOlustur(bot, msg, match){
    var icindekiler = bol(match[1]);
    data.resim = icindekiler[0];
    data.baslik = icindekiler[1];
    data.icerik = 
    var resim = data.resim;
    var baslik = data.baslik;
    var icerik = data.icerik;
}
{"Resim":"ornekresim.jpg","Baslik":"Bir Telegram Botu Nasıl Yazılamaz?","zaman":"Sırat Köprüsünü Geçince","İçerik":"Bir telegram botu yazma hikayesi daha doğrusu yazamama hikayesi ...."}
txt formatı:
    Resim: link \n
    baslik: basdasddas \n
    zaman: tarih \n 
    İçerik: asdadaasdadsads \n

*/
function txtToJSON(txt) {
    etkinlik = {
        resim: "path",
        baslik: "baslik",
        tarih: "tarih",
        icerik: "icerik"
    };
    var data = fs.readFileSync(txt).toString().split("\n");
    etkinlik[0] = data[0];
    etkinlik[1] = data[1];
    etkinlik[2] = data[2];
    etkinlik[3] = data[3];
    var etkinlik_element = JSON.stringify(etkinlik);
    return etkinlik_element;
}
function etkinlikEkle(bot, msg, match) {//hele bir json yüklesin
    var chatId = msg.chat.id;
    //var TXTfile = match[1];
    //var etkinlik_element = txtToJSON(TXTfile);
    var etkinlik_element = fs.readFileSync(match[1]).toString();
    fs.appendFile("etkinlikduzeni.json", etkinlik_element + "\n", "utf-8", function (err) {
        if (err) {
            bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu");
        } else {
            console.log("JSON file has been saved.");
            bot.sendMessage(chatId, "Eline sağlık, etkinlik eklendi tamamlanmıştır");
        }
    });
}
module.exports = { etkinlikEkle };