export class BoardController {
  constructor ($firebaseArray, $location) {
    'ngInject';

    var userName = "";
    var roomID = $location.path().split("/")[2];
    console.log("roomID is " + roomID);
    this.likes = [];

    var userRef = new Firebase("https://vyapi.firebaseio.com/messages");
    var authData = userRef.getAuth();

    var roomURL= "https://vyapi.firebaseio.com/messages/" + roomID;
    this.msgRef = new Firebase(roomURL);
    this.messages = $firebaseArray(this.msgRef);

    // $(this).toggleClass('btn-success').toggleClass('btn-default');
    // $(this).

    //CODE TO MAKE THE USER ANONYMOUS
    /*$('#anonymousTogglePlus').toggle(function(){
        $(this).addClass("active");
        }, function () {
        $(this).removeClass("active");
    });*/

    var anonymous = true;

    this.toggle = function() {
      anonymous = !anonymous;
      if(!anonymous){
        userName = authData.google.displayName;
        $('.anonymousToggle').css({"background-color":"#eeeeee","color":"black"});
      } else {
        userName = "anonymous";
        $('.anonymousToggle').css({"background-color":"#6D6A68","color":"white"});
      }
      console.log(userName);
    };

    //CODE TO ENTER THE OBJECT IN FIREBASE DATABASE
    this.submit = function(id) {
      var userMessage = (id=='plus') ? this.userMessagePlus : this.userMessageMinus;

      if (userMessage) {
        if(!userName) userName = "anonymous";
        // console.log(authData);

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

    //CODE TO DELETE THE MESSAGE POSTED
    this.delete=function(msg){
      var ide=msg.$id;
      //  console.log(msg.uid);
      //console.log(authData.google.id);
      // var roomRef = new Firebase('https://vyapi.firebaseio.com/messages/'+roomID).remove();
      if(msg.uid === "google:"+authData.google.id)
        this.msgRef.child(ide).remove();
      console.log(msg.$id);
    };

    //CODE TO DISPLAY THE 5 SECOND NOTIFICATION FOR ANONYMITY
    $('#anonymousWarn').fadeIn().delay(5000).fadeOut();

    /*//CODE TO ENTER NEW LINE ON PRESSING SHIFT+ENTER
    $('#userTextPlus').on('keydown', function(event) {
      if (event.keyCode == 13)
        if (!event.shiftKey) $('#testForm').submit();
    });*/
    
    //if message added, add a listener for the number of likes
    //todo: optimization. the listeners still live even if the corresponding messsage is deleted
    (new Firebase(roomURL)).on('value', (messagesObj) => {
      for (var messageId in messagesObj.val()) {
        (new Firebase(roomURL + "/" + messageId + "/like/")).on("value", (userId) => {
          if(userId.val() != null) {
            console.log("user: " + Object.keys(userId.val()) + " liked " + messageId);
            if(this.likes[messageId] == undefined)
              this.likes[messageId] = 0;
            this.likes[messageId] += 1;
          }
        });
      }
    });
    
    //handle like button click for a message
    this.like = function(index) { //index is the index in this.messages array
      console.table("like: " + this.messages[index].$id);
      (new Firebase(roomURL)).child(this.messages[index].$id + "/like/" +authData.uid).set(1);
    }
    
    
    
  }
}
