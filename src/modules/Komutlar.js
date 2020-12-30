function komutlar(bot, msg){
    var chatId = msg.chat.id;
    var yardım = "Komut Listesi==>\n" +
        "/tekrar <<tekrar edilmesi gereken şiy>>\nbu komut ile bota istediğiniz küfrü tekrar ettirebilirsiniz\n" +
        "/etkinlik çok yakında hizmete girecek, apisini yazalım hele\n" +
        "/kayit komutu ile topluluğa kaydınızı kendi başınıza yapabilirsiniz\n\tkullanımı: İsim Soyisim elektronik@posta.com 0xxxxxxxxxx" +
        "\n\tya da İsim1 İsim2 Soyisim elektronik@posta.com xxxxxxxxxx\n" +
        "/sa botla selam alıp vermeniz için\n" +
        "/naptın ve /naptin botun halini hatrını sorabilmeniz için\n" +
        "/napıyon botun yaşayıp yaşamadığını sorgulamak için\n" +
        "naptın, naptin veya napıyon yazmanız yeterli /'a gerek yok :)\n" +
        "/hava <<sehir>> bulunduğunuz ilin güncel hava sıcaklığını sorgulamak için\n" +
        "/film <<film>> filmler üzerine kültürel bir tartışmanın ortasında mısınız?" +
        "film ile alakalı bir şeyler mi bilmek istiyorsunuz? o zaman sorun yahu!\n" +
        "/filma <<film>> tartışma çok mu derin? bir de bunu dene!\n" +
        "/ezanan ankara günlük ezan saatleri, cumayı kaçırmayalım :)\n";
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['/etkinlik'],
                ['/sa'],
                ['/naptın'],
                ['/napıyon'],
                ['/hava Ankara'],
                ['/ezanan'],
                ['/naptın']
            ]
        })
    };
    bot.sendMessage(chatId, yardım, opts);
}
module.exports = {komutlar};