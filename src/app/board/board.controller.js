export class BoardController {
  constructor ($firebaseArray) {
    'ngInject';

    var ref = new Firebase("flickering-fire-3902.firebaseIO.com");

    this.usertext = '';
    this.messages = $firebaseArray(ref);

    this.submit = function() {

      if (this.usertext) {
        var username = this.username || "anonymous";
        this.messages.$add({
          from: username,
          body: this.usertext
        });

        this.usertext = '';
      }
    };
  }

}
