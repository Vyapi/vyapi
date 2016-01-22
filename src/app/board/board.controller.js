export class BoardController {
  constructor ($firebaseArray, $location) {
    'ngInject';

    var userRef = new Firebase("https://vyapi.firebaseio.com/");
    var authData = userRef.getAuth();
    userRef.child("messages/"+ authData.uid).set();


    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      // console.log(authData);
      }
      else {
      console.log("User is logged out");
    }




    var ref = new Firebase("flickering-fire-3902.firebaseIO.com");

    this.messages = $firebaseArray(ref);

    this.submit = function(id) {

      var userName = authData.google.displayName;
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
