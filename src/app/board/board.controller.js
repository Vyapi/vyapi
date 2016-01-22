export class BoardController {
  constructor ($firebaseArray, $location) {
    'ngInject';


    var roomID = $location.path().split("/")[2];
    console.log("roomID is " + roomID);

    var userRef = new Firebase("https://vyapi.firebaseio.com/messages");
    var authData = userRef.getAuth();
    // userRef.child("messages/"+ roomID).set(this.messages);

    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      // console.log(authData);
    }
    else {
      console.log("User is logged out");
    }

    var ref = new Firebase("flickering-fire-3902.firebaseIO.com");
    var random = "https://vyapi.firebaseio.com/messages/" + roomID;
    var ref2 = new Firebase(random);
    this.messages = $firebaseArray(ref);

    // userRef.child("messages/"+ roomID).set({

    this.submit = function(id) {

      var userName = authData.google.displayName;
      var userMessage = (id=='plus') ? this.userMessagePlus : this.userMessageMinus;

      if (userMessage) {
        if(!userName) userName = "anonymous";
        console.log(authData);

        ref2.push({
          from: userName,
          uid: authData.uid,
          text: userMessage,
          lane: id
        });

        this.userMessagePlus = '';
        this.userMessageMinus = '';
      }
    };
  }
}
