var fs = require('fs');
function bol(str) {
    var isim_soyisim = str.split(/\s+/);
    return isim_soyisim;
}
function hataKontrol(durum, chatId) {
    if (durum == 1)
        bot.sendMessage(chatId, "Yanlış mail formatı girdiniz.");
    else if (durum == 2)
        bot.sendMessage(chatId, " Telefon numarasını düzgün giriniz.");
    else if (durum == 3)
        bot.sendMessage(chatId, "Hem Telefon numarasını, hem mail adresini yanlış girdiniz, yok size kayıt.");
}
function kayıt(bot, msg, match){
    var chatId = msg.chat.id;
    var bilgiler = match[1];
    var durum = 0; //0= başlangıç durumu 1 yanlış mail, 2 yanlış e posta 3 hem yanlış e posta hem yanlış telefon
    var obje = bol(bilgiler);
    data = {
        name: "isim",
        surname: "soyisim",
        e_posta: "bolum",
        telefon: "mail"
    };
    if (obje.length == 5) {
        data.name = obje.slice(0, 3)[0] + " " + obje.slice(0, 3)[1];
        data.surname = obje.slice(0, 3)[2];

        if (obje[3].includes('@')) {
            if (obje[2].endsWith('.com') || obje[2].endsWith('.net')) {
                data.e_posta = obje[3];
            } else {
                durum += 1;
            }

        } else {
            durum += 1;
        }
        // telefon
        if(obje[4].length == 10 || obje[4].length == 11 ){

            if (obje[4].length == 11) {
                if (obje[4].search('05') == 0) {
                    data.telefon = obje[4];
                }
            } else if (obje[4].length == 10) {
                if (obje[4].search('5') == 0) {
                    data.telefon = obje[4];
                }
            } else {
                durum += 2;
            }
        }else{
            durum +=2;
        }
        

    } //2ismi var demektir  
    else if (obje.length == 4) {
        data.name = obje.slice(0, 2)[0];
        data.surname = obje.slice(0, 2)[1];

        // mail
        if (obje[2].includes('@')) {
            if (obje[2].endsWith('.com') || obje[2].endsWith('.net')) {
                data.e_posta = obje[2];
            } else {
                durum += 1;
            }

        } else {
            durum += 1;
        }


        // telefon
        if(obje[3].length == 10 || obje[3].length == 11 ){
        if (obje[3].length == 11) {
            if (obje[3].search('05') == 0) {
                data.telefon = obje[3];
            }
        } else if (obje[3].length == 10) {
            if (obje[3].search('5') == 0) {
                data.telefon = obje[3];
            }
        } else {
            durum += 2;
        }
    } else{
        durum+=2;
    }
    } // tek ismi var demektir
    if (data.telefon != "mail" || data.e_posta != "bolum") {
        var kayit_element = JSON.stringify(data);
        fs.appendFile("student.json", kayit_element + "\n", "utf-8", function (err) {
            if (err) {
                bot.sendMessage(chatId, "Hay Allah :( bir aksilik oldu");
            } else {
                console.log("JSON file has been saved.");
                bot.sendMessage(chatId, "Eline sağlık, kayıt tamamlanmıştır");
            }
        });
    } else { hataKontrol(durum, chatId); bot.sendMessage(chatId, "Eline sağlık diyemiyorum, kayıt TAMAMLANAMADI"); }
}
module.exports = {kayıt, bol};