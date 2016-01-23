export class BoardController {
  constructor ($firebaseArray, $location) {
    'ngInject';


    var roomID = $location.path().split("/")[2];
    console.log("roomID is " + roomID);

    var userRef = new Firebase("https://vyapi.firebaseio.com/messages");
    var authData = userRef.getAuth();
    // userRef.child("messages/"+ roomID).set(this.messages);

    // if (authData) {
    //   console.log("User " + authData.uid + " is logged in with " + authData.provider);
    //   // console.log(authData);
    // }
    // else {
    //   console.log("User is logged out");
    // }

    var random = "https://vyapi.firebaseio.com/messages/" + roomID;
    // var ref3 = new Firebase("https://vyapi.firebaseio.com/");
    this.msgRef = new Firebase(random);
    this.messages = $firebaseArray(this.msgRef);
    // console.log(roomID);
    // console.log(this.messages);

    // userRef.child("messages/"+ roomID).set({

      this.submit = function(id) {

        var userName = authData.google.displayName;
        var userMessage = (id=='plus') ? this.userMessagePlus : this.userMessageMinus;

        if (userMessage) {
          if(!userName) userName = "anonymous";
          console.log(authData);

          this.messages.$add({
            from: userName,
            uid: authData.uid,
            text: userMessage,
            lane: id
          });

          this.userMessagePlus = '';
          this.userMessageMinus = '';
        }
      };


      this.delete=function(msg){
        var ide=msg.$id;
        //  console.log(msg.uid);
        //console.log(authData.google.id);
        // var roomRef = new Firebase('https://vyapi.firebaseio.com/messages/'+roomID).remove();
        if(msg.uid === "google:"+authData.google.id)
        this.msgRef.child(ide).remove();
        console.log(msg.$id);
      };

      $('#anonymousWarn').fadeIn().delay(5000).fadeOut();


    }
  }
