const bol = require('./Kayit');
var fs = require("fs")
var request = require('request');
var etkinlik_data = require("../etkinlik.json");

etkinlikD = {
    resim: "path",
    baslik: "baslik",
    tarih: "tarih",
    icerik: "icerik",
    website: "websites"
};
etkinlikD.resim = etkinlik_data.etkinlik[0].Resim;
etkinlikD.baslik = etkinlik_data.etkinlik[0].Baslik;
etkinlikD.tarih = etkinlik_data.etkinlik[0].Tarih;
etkinlikD.icerik = etkinlik_data.etkinlik[0].Icerik;
etkinlikD.website = etkinlik_data.etkinlik[0].Website;

function etkinlik(bot, msg) {
    var msgID = msg.from.id;

    const stream = fs.createReadStream(etkinlikD.resim);
    // console.log(etkinlikbilgi.resim);//resim ismi rakamla başlamalı

    bot.sendPhoto(msgID, stream,
        {
            reply_to_message_id: msg.message_id,
            caption:
                '\nBaşlık: ' + etkinlikD.baslik +
                '\nTarih: ' + etkinlikD.tarih +
                '\nİçerik: ' + etkinlikD.icerik +
                '\nDaha fazlası için: ' + etkinlikD.website
        });
}
module.exports = { etkinlik };