const bol = require('./Kayit');
var fs = require("fs")
// var request = require('request');
var etkinlik_data = require("../etkinlik.json");

function etkinliklerr() {
    etkinlikD = [{
        resim: "path",
        baslik: "baslik",
        tarih: "tarih",
        icerik: "icerik",
        website: "websites"
    }];
    for (i = 0; i < etkinlik_data.etkinlik.length; i++) {
        etkinlikD[i].resim = etkinlik_data.etkinlik[i].Resim;
        etkinlikD[i].baslik = etkinlik_data.etkinlik[i].Baslik;
        etkinlikD[i].tarih = etkinlik_data.etkinlik[i].Tarih;
        etkinlikD[i].icerik = etkinlik_data.etkinlik[i].Icerik;
        etkinlikD[i].website = etkinlik_data.etkinlik[i].Website;
    }
    return etkinlikD;
}


function etkinlik(bot, msg) {
    var msgID = msg.from.id;

    var etkinlikler = etkinliklerr()
    // console.log(etkinlikbilgi.resim);//resim ismi rakamla başlamalı
    for (i = 0; i < etkinlikler.length; i++) {
        bot.sendPhoto(msgID, etkinlikler[i].resim,
            {
                reply_to_message_id: msg.message_id,
                caption:
                    '\nBaşlık: ' + etkinlikler[i].baslik +
                    '\nTarih: ' + etkinlikler[i].tarih +
                    '\nİçerik: ' + etkinlikler[i].icerik +
                    '\nDaha fazlası için: ' + etkinlikler[i].website
            });
    }
}
module.exports = { etkinlik };