export class BoardController {
  constructor ($scope, $firebaseArray, $location) {
    'ngInject';

    var userName = "";
    var appURL = "https://vyapi.firebaseio.com/";
    var roomID = $location.path().split("/")[2];
    console.log("roomID is " + roomID);
    var noOfLikes = [];

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
    this.toggle = function() {
      anonymous = !anonymous;
      if(!anonymous){
        userName = authData.google.displayName;
        $('.anonymousToggle').css({"background-color":"#eeeeee","color":"black"});
      } else {
        userName = "anonymous";
        $('.anonymousToggle').css({"background-color":"#6D6A68","color":"white"});
      }
    };

    //CODE TO ENTER THE OBJECT IN FIREBASE DATABASE
    this.submit = function(id) {
      let userMessage = (id=='plus') ? this.userMessagePlus : this.userMessageMinus;

      if (userMessage) {
        if(!userName) userName = "anonymous";
        // console.log(authData);

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

    //CODE TO DELETE THE MESSAGE POSTED
    this.delete=function(msg){
      let messageId=msg.$id;
      if(msg.uid === userId)
        this.msgRef.child(messageId).remove();
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
      let t = (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid);
      t.once("value" , function(value){
        if(value.exists()){
          t.remove();
        }
        else{
          t.set(1);
          t.off();
        }
      });

      let ta = (new Firebase(roomURL)).child(msg.$id + "/like/");
      ta.once('value', function(snapshot) {
        msg.noOfLikes=snapshot.numChildren();
      });
    }

    //CODE TO ENABLE DRAG AND DROP OF STICKYs
    $('.delete-btn').css({'visibility' : 'hidden'});
    $('.like-btn').css({'visibility' : 'hidden'});
    $("#chat-messages-plus").sortable();
    $("#chat-messages-minus").sortable();
    $("#chat-messages-plus").disableSelection();
    $("#chat-messages-minus").disableSelection();

    //CODE TO SHOW DELETE/LIKE ETC ON HOVER
    this.hover = function(msg){
      if(msg.uid === userId) {

      }
      $('.delete-btn').css({'visibility' : 'visible'});
      $('.like-btn').css({'visibility' : 'visible'});
    };

    this.show = function(msg){
      $('.delete-btn').css({'visibility' : 'hidden'});
      $('.like-btn').css({'visibility' : 'hidden'});
    };

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
      console.log("edit hererere");
      this.currentMessageText= msg.text;
      this.currentMessage = msg;
    }
    this.saveEdit = function (msg)
    {
      (new Firebase(roomURL + "/" + msg.$id+"/text")).set( msg.text);
    }
  }
}


    // //CODE TO ENTER NEW LINE ON PRESSING SHIFT+ENTER
    //#############################################
    // $('#userTextPlus').on('keydown', function(event) {
    //   if (event.keyCode == 13)
    //     if (!event.shiftKey) $('#testForm').submit();
    // });


    // function pasteIntoInput(el, text) {
    //   el.focus();
    //   if (typeof el.selectionStart == "number"
    //         && typeof el.selectionEnd == "number") {
    //     let val = el.value;
    //     let selStart = el.selectionStart;
    //     el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
    //     el.selectionEnd = el.selectionStart = selStart + text.length;
    //   } else if (typeof document.selection != "undefined") {
    //     let textRange = document.selection.createRange();
    //     textRange.text = text;
    //     textRange.collapse(false);
    //     textRange.select();
    //   }
    // }

    // function handleEnter(evt) {
    //   if (evt.keyCode == 13 && evt.shiftKey) {
    //     if (evt.type == "keypress") {
    //         pasteIntoInput(this, "\n");
    //     }
    //   evt.preventDefault();
    //   }
    // }

    // // Handle both keydown and keypress for Opera, which only allows default
    // // key action to be suppressed in keypress
    // //$("#your_textarea_id").keydown(handleEnter).keypress(handleEnter);
    // $('#userTextPlus').keydown(handleEnter).keypress(handleEnter);

    // $("userTextPlus").keydown(function(e){
    // // Enter was pressed without shift key
    //   if (e.keyCode == 13 && !e.shiftKey)
    //   {
    //     // prevent default behavior
    //     e.preventDefault();
    //   }
    // });
