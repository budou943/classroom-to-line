function sendEmailToLine() {
  var accessToken = "LINE Notifyのアクセスコード";
  var threads = GmailApp.search("is:unread label:classroom"); // 未読メールのみ検索
  var messages = GmailApp.getMessagesForThreads(threads);
  
  for (var i = 0; i < messages.length; i++) {
    var email = messages[i][0];
    var body = email.getPlainBody();
    var subject = email.getSubject();
    
    // メール末尾の部分を削除
    var pattern = /Google LLC 1600 .*$/s;
    body = body.replace(pattern, '');

   // メール本文からURLを削除
    var pattern = /(<.*?>)|((https?|ftp)(:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?))/gi;
    body = body.replace(pattern, '');

//massageをbodyにしてに名前を削除
var message = body.slice(7);

    
    var url = "https://notify-api.line.me/api/notify";
    var options = {
      "method": "post",
      "headers": {
        "Authorization": "Bearer " + accessToken
      },
      "payload": {
        "message": message
      }
    };
    
    UrlFetchApp.fetch(url, options);
    
    // 既読にする
    email.markRead();
  }
}
