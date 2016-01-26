export class BoardController {
  constructor ($firebaseArray, $location) {
    'ngInject';
    var userName = "";


    var roomID = $location.path().split("/")[2];
    console.log("roomID is " + roomID);
    //this.likes = [];
    var noOfLikes = [];
    var userRef = new Firebase("https://vyapi.firebaseio.com/messages");
    var authData = userRef.getAuth();

    var roomURL= "https://vyapi.firebaseio.com/messages/" + roomID;
    this.msgRef = new Firebase(roomURL);
    this.messages = $firebaseArray(this.msgRef);

    // var ta = (new Firebase(roomURL)).child(msg.$id + "/like/");
    //   ta.once('value', function(snapshot) {
    //     msg.noOfLikes=snapshot.numChildren(); 

    //   });


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
            lane: id,
            dl: 0
        });

        this.userMessagePlus = '';
        this.userMessageMinus = '';
    }
};

    //CODE TO DELETE THE MESSAGE POSTED
    this.delete=function(msg){
      var ide=msg.$id;
      console.log(msg);
      //console.log(authData.google.id);
      // var roomRef = new Firebase('https://vyapi.firebaseio.com/messages/'+roomID).remove();
      if(msg.uid === "google:"+authData.google.id)
        this.msgRef.child(ide).remove();
    console.log("delete: " + msg.$id);
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
    //==========================================================================================var roomURL= "https://vyapi.firebaseio.com/messages/" + roomID;
    //var lkeURL = roomURL + "/likes";
    
    (new Firebase(roomURL)).on('child_added', (messagesObj) => {

      (new Firebase(encodeURI(roomURL + "/" + messagesObj.key() + "/like"))).on('value', (userId) => {

        if(userId.val() != null && messagesObj.key()) { //likes are there for this message

          console.log(userId.numChildren());
          console.log(messagesObj.val().uid);
          //this.noOfLikes [messagesObj.val().uid] =userId.numChildren();
          var fredNameRef = new Firebase(roomURL + "/" + messagesObj.key());

            // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
            fredNameRef.update({ dl: userId.numChildren() });

         //console.log(Object.keys(userId.val()) + " liked " + messagesObj.key());

         // console.log(this.likes);
     }
     else 
     {
      console.log(userId.numChildren());
      console.log(messagesObj.val().text);
          //this.noOfLikes [messagesObj.val().text] =userId.numChildren();
          var fredNameRef = new Firebase(roomURL + "/" + messagesObj.key());
            // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
            fredNameRef.update({ dl: userId.numChildren() });
        }
    });
});
      // (new Firebase(encodeURI(roomURL + "/" + messagesObj.key() + "/like"))).on('child_removed', (userId) => {
      //   if(userId.val() != null && messagesObj.key()) { //likes are there for this message

      //     console.log(userId);
      //     console.log("%");
      //     // if(this.likes[messagesObj.key()] == undefined) //
      //     //   this.likes[messagesObj.key()] = 0;
      //     // this.likes[messagesObj.key()] += 1;
      //     // console.log(Object.keys(userId.val()) + " liked " + messagesObj.key());

      //     // console.log(this.likes);
      //   }
      // });


    // (new Firebase(roomURL)).on('child_removed', (messagesObj) => {
    //   (new Firebase(encodeURI(roomURL + "/" + messagesObj.key() + "/like"))).on('value', (userId) => {
    //     if(userId.val() != null && messagesObj.key()) { //likes are there for this message

    //       console.log(userId.numChildren());
    //       console.log("%");
    //       // if(this.likes[messagesObj.key()] == undefined) //
    //       //   this.likes[messagesObj.key()] = 0;
    //       // this.likes[messagesObj.key()] += 1;
    //       // console.log(Object.keys(userId.val()) + " liked " + messagesObj.key());

    //       // console.log(this.likes);
    //     }
    //   });
    // });
    // this.noOfLikes = function(msg) {
    //   //console.log("called");
    //   return 0;
    // }


    //handle like button click for a message
    this.like = function(msg) {
      //console.table("like: " + msg.$id);
      //(new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid).set(1);
      var t = (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid);
      t.once("value" , function(value){
          //console.log('triggring event');

          if(value.exists()){
            t.remove();
        }
        else{
            t.set(1);
            t.off();
        }

      //   if(!_.isUndefined(status.val())) {
      //     (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid).set(!status.val());
      //     // if(status.val()===1)
      //     //   (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid).set(0);
      //     // else
      //     //   (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid).set(1);
      //   } else {
      //      (new Firebase(roomURL)).child(msg.$id + "/like/" +authData.uid).set(1);
      //   }
      // });c
      // t.off();
  });

      var ta = (new Firebase(roomURL)).child(msg.$id + "/like/");
      ta.once('value', function(snapshot) {
        msg.noOfLikes=snapshot.numChildren(); 

    });

      // ta.on('value', function(likeList) {
      //   console.log(Object.keys(likeList).length);
      // });
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
    //     var val = el.value;
    //     var selStart = el.selectionStart;
    //     el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
    //     el.selectionEnd = el.selectionStart = selStart + text.length;
    //   } else if (typeof document.selection != "undefined") {
    //     var textRange = document.selection.createRange();
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
