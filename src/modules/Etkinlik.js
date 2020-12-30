function etkinlik(bot, msg){
    var chatId = msg.chat.id;
    var etkinlik = 'etkinlik apisi daha azır değil bea'/*buradan etkinlik apisinden çekip yazdırcaz*/;
    bot.sendMessage(chatId, etkinlik);
}
module.exports = {etkinlik};