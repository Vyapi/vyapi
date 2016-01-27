export class BoardController {
  constructor ($firebaseArray, $location,$log) {

    'ngInject';

    var userName = "";
    var appURL = "https://vyapi.firebaseio.com/";
    var roomID = $location.path().split("/")[2];
    var anonymous = true;
    $log.log("roomID is " + roomID);


    var userRef = new Firebase("https://vyapi.firebaseio.com/messages");
    var authData = userRef.getAuth();
    var googleId = authData.google.id;
    var userId = "google:"+googleId;
    var anonymous = true;

    var roomURL= "https://vyapi.firebaseio.com/messages/" + roomID;
    console.log(roomURL);
    this.msgRef = new Firebase(roomURL);
    this.messages = $firebaseArray(this.msgRef);



    //CODE TO MAKE THE USER ANONYMOUS
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
      //console.log("in adding message");
      let userMessage = (id=='plus') ? this.userMessagePlus : this.userMessageMinus;
      var ref=new Firebase("https://vyapi.firebaseio.com/rooms/"+roomID);
      var dashboard;
      var num;
      if(id == 'plus')
        dashboard=new Firebase(ref+"/pos");
      else
        dashboard=new Firebase(ref+"/neg");

        dashboard.once("value",(snapshot)=>{
        num = parseInt(snapshot.val());
         num++;
         if(id =='plus')
           ref.update({pos : num});
        else
           ref.update({neg : num});
         console.log(num);

      });



      if (userMessage) {
        if(!userName) userName = "anonymous";
        // $log.log(authData);

        this.messages.$add({
          from: userName,
          uid: authData.uid,
          text: userMessage,
          lane: id,
          dl: 0
        });

        this.userMessagePlus = '';
        this.userMessageMinus = '';
      }
    };



    //CODE TO DISPLAY THE 5 SECOND NOTIFICATION FOR ANONYMITY
    $('#anonymousWarn').fadeIn().delay(5000).fadeOut();

    //CODE TO COUNT THE NO. OF LIKES ON A MESSAGE
    (new Firebase(roomURL)).on('child_added', (messagesObj) => {
      (new Firebase(encodeURI(roomURL + "/" + messagesObj.key() + "/like"))).on('value', (userId) => {
        if(userId.val() != null && messagesObj.key()) { //likes are there for this message
          //this.noOfLikes [messagesObj.val().uid] =userId.numChildren();
          let fredNameRef = new Firebase(roomURL + "/" + messagesObj.key());
          // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
          fredNameRef.update({ dl: userId.numChildren() });
        }
        else
        {
          //this.noOfLikes [messagesObj.val().text] =userId.numChildren();
          let fredNameRef = new Firebase(roomURL + "/" + messagesObj.key());
          // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
          fredNameRef.update({ dl: userId.numChildren() });
        }
      });
    });

    //handle like button click for a message
    this.like = function(msg) {
      let msgLike = (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid);
      msgLike.once("value" , function(value){
        //console.log('triggring event');
        if(value.exists()){
          msgLike.remove();
        }
        else{
          msgLike.set(1);
          msgLike.off();
        }
      });

      let msgLikes = (new Firebase(roomURL)).child(msg.$id + "/like/");
      msgLikes.once('value', function(snapshot) {
        msg.noOfLikes=snapshot.numChildren();
      });
    }

    //CODE TO ENABLE DRAG AND DROP OF STICKYs
    $('.delete-btn').css({'visibility' : 'hidden'});
    $('.like-btn').css({'visibility' : 'hidden'});
    $('.edit-btn').css({'visibility' : 'hidden'});
    $('.save-btn').css({'display' : 'hidden'});
    $("#chat-messages-plus").sortable();
    $("#chat-messages-minus").sortable();
    $("#chat-messages-plus").disableSelection();
    $("#chat-messages-minus").disableSelection();

    //CODE TO SHOW DELETE/LIKE ETC ON HOVER
    this.hover = function(msgId){
      if(msgId === userId) {
        $('.edit-btn').css({'visibility' : 'visible'});
      }
      // $('.delete-btn').css({'visibility' : 'visible'});
      // $('.like-btn').css({'visibility' : 'visible'});
      // $('.edit-btn').css({'visibility' : 'visible'});
    };

    this.show = function(msgId){
      if(msgId === userId) {
        $('.edit-btn').css({'visibility' : 'hidden'});
      }
      // $('.delete-btn').css({'visibility' : 'hidden'});
      // $('.like-btn').css({'visibility' : 'hidden'});
      // $('.edit-btn').css({'visibility' : 'hidden'});

    //CODE TO DELETE THE MESSAGE POSTED
    this.delete=function(msg,temp){
      console.log("in delete function");
      var ide=msg.$id;
      //console.log(msg);
      var refe = new Firebase("https://vyapi.firebaseio.com/rooms/"+roomID);
      var dash;
      var number;
      if(temp === 5)
        dash=new Firebase(refe+"/pos");
      else
        dash=new Firebase(refe+"/neg");
        dash.once("value",(snapshot)=>{
        number = parseInt(snapshot.val());
        number=number-1;
        if(temp === 5)
        refe.update({pos : number});
      else
        refe.update({neg : number});
        console.log("deletong",number);
      });


      let messageId=msg.$id;
      if(msg.uid === userId)
        this.msgRef.child(messageId).remove();
    };

    //CODE TO SHOW THE EDIT BUTTON ONLY ON SELF STICKYs
    this.getListId = function(msgId){
      console.log(msgId);
      return msgId;
    }

    //CODE TO EDIT THE STICKY NOTES
    this.isOwner=function(msgId)
    {
      if(msgId=== userId)
        return true;
      else
        return false;
    }

    this.currentMessageText= "hello";
    this.currentMessage;

    this.edit = function(msg) {
      this.currentMessageText= msg.text;
      this.currentMessage = msg;
      // $('#stickyTextarea').setAttribute("disabled","disabled");
      $('#stickyTextarea').focus();
      $('.edit-btn').css({'display' : 'none'});
      $('.save-btn').css({'display' : 'inline-block'});
    }

    this.saveEdit = function (msg)
    {
      (new Firebase(roomURL + "/" + msg.$id+"/text")).set(msg.text);
      if(msg.uid == userId) {
        $('.edit-btn').css({'display' : 'inline-block'});
        $('.save-btn').css({'display' : 'none'});
        $('#stickyTextarea').blur();
        // $('#stickyTextarea').removeAttribute("disabled");
      }
    }
  }
}


