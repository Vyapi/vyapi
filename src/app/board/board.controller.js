export class BoardController {
  constructor ($scope, $firebaseArray, $location) {
    'ngInject';
    $scope.select=null;
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



    
    this.isOwner=function(msg)
    {
       var ide=msg.$id;
      if(msg.uid=== "google:"+authData.google.id)
         return true;
       else
        return false;

    }
    this.like = function(msg) {
      console.table("like: " + msg.$id);
      //(new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid).set(1);
      var t = (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid);
      t.once("value" , function(value){
        console.log('triggring event');
      if(value.exists()){
        t.remove();
      }
      else{
        t.set(1);
        t.off();
      }
    });
       var ta = (new Firebase(roomURL)).child(msg.$id + "/like/");
     ta.once('value', function(snapshot) {console.log(snapshot.numChildren()); });
    }

    this.currentMessageText= "hello";
    this.currentMessage;
    this.edit = function(msg) {
      console.log("edit hererere");
      this.currentMessageText= msg.text;
      this.currentMessage = msg;
    }
    this.saveEdit = function (msg)
    {
      console.log( msg.text + "TT") ;
      (new Firebase(roomURL + "/" + msg.$id+"/text")).set( msg.text);
      
    }
  }
  
}
