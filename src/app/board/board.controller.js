export class boardController {
  constructor ($firebaseArray) {
    'ngInject';

    var ref = new Firebase("flickering-fire-3902.firebaseIO.com");

    this.messages = $firebaseArray(ref);

    this.addMessage = function() {

      if (this.msg) {

        var name = this.name || "anonymous";

        this.messages.$add({
          from: name,
          body: this.msg
        });

        this.msg = "";
      }
    }
  }

}
