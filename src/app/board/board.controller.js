export class BoardController {
  constructor ($firebaseArray) {
    'ngInject';

    var ref = new Firebase("flickering-fire-3902.firebaseIO.com");

    this.messages = $firebaseArray(ref);

    this.submit = function(id) {

      var username = (id=='plus') ? this.username1 : this.username2;
      console.log(username);
      var userMessage = (id=='plus') ? this.userMessage1 : this.userMessage2;
      console.log(userMessage);

      if (userMessage) {
        if(!username) username = "anonymous";
        this.messages.$add({
          from: username,
          body: userMessage,
          id: id
        });

        this.userMessage1 = '';
        this.userMessage2 = '';
      }
    };
  }

}
