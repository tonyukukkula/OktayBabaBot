function tekrar(bot,msg, match){
    var chatId = msg.chat.id;
    var tekrar = match[1];
    bot.sendMessage(chatId, tekrar);
    setTimeout(() => { bot.sendMessage(chatId, 'bana bunu neden dedirttin olm'); }, 1900, 'funky');
}
function sa(bot,msg){
    var chatId = msg.chat.id;
    var cvp = 'as reis';
    bot.sendMessage(chatId, cvp);
}
function naptın(bot,msg){
    var chatId = msg.chat.id;
    var cvp = 'yaşıyoruz reis senden?';
    bot.sendMessage(chatId, cvp);
}
function napıyon(bot,msg){
    var chatId = msg.chat.id;
    var cvp = 'yaşıyom';
    bot.sendMessage(chatId, cvp);
    bot.sendMessage(chatId, 'sen?');
}
function naptin(bot,msg){
    var chatId = msg.chat.id;
    var cvp = 'yaşıyoruz reis senden?';
    bot.sendMessage(chatId, cvp);
}
module.exports = {tekrar, naptın, naptin, napıyon, sa};