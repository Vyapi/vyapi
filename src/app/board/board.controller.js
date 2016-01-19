export class boardController {
  constructor ($timeout, webDevTec, toastr) {
    'ngInject';

    var ref = new Firebase('flickering-fire-3902.firebaseIO.com');
    $('#messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        ref.push({name: name, text: text});
        $('#messageInput').val('');
      }
    });
    ref.on('child_added', function(snapshot) {
      var message = snapshot.val();
      displayChatMessage(message.name, message.text);
    });
    function displayChatMessage(name, text) {
      $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    };

  }
}
