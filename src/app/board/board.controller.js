export class BoardController {
  constructor ($firebaseArray) {
    'ngInject';

    var ref = new Firebase("flickering-fire-3902.firebaseIO.com");

    this.messages = $firebaseArray(ref);

    this.submit = function(id) {

      var userName = (id=='plus') ? this.userNamePlus : this.userNameMinus;
      var userMessage = (id=='plus') ? this.userMessagePlus : this.userMessageMinus;

      if (userMessage) {
        if(!userName) userName = "anonymous";
        this.messages.$add({
          from: userName,
          body: userMessage,
          id: id
        });

        this.userMessagePlus = '';
        this.userMessageMinus = '';
      }
    };
  }

}
