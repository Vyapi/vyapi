export class BoardController {
  constructor ($firebaseArray, $location,$log, $stateParams, Dashboard, $timeout, $window, $localStorage) {

    'ngInject';

    var userName = "";
    var appURL = "https://vyapi.firebaseio.com/";
    var roomID = $location.path().split("/")[2];
    var roomId = $stateParams.roomKey;
    this.anonymous = true;

    var notificationIDs = ["#delete-confirmation", "#anonymous-confirmation", "#visible-confirmation", "#like-denied"];
    this.hideAllNotifications = function() {
      notificationIDs.forEach(function(id) {
        $(id).hide();
      });
    }
    this.hideAllNotifications();

    var userId = $localStorage.userInfo['id'];

    this.plusLabel='';
    this.minusLabel='';
    this.roomName='';
    var roomRef= new Firebase("https://vyapi.firebaseio.com/rooms/" + roomID);
    roomRef.on("value",(snapshot)=>{
      let labelData = snapshot.val();
      this.roomName = labelData.roomName;
      this.plusLabel = labelData.plusLabel;
      this.minusLabel = labelData.minusLabel;
    });

    var roomURL= "https://vyapi.firebaseio.com/messages/" + roomID;
    this.msgRef = new Firebase(roomURL);
    this.messages = $firebaseArray(this.msgRef);

    var onlineUsersRef = new Firebase(appURL + "onlineUsers/");
    this.onlineUsers = {};

    //CODE TO MAKE THE USER ANONYMOUS
    this.toggle = function() {
      this.anonymous = !this.anonymous;
      this.hideAllNotifications();

      if(!this.anonymous) {
        userName = $localStorage.userInfo['given_name'];//authData.google.displayName;
        $("#visible-confirmation").show();
        $timeout(function() { $("#visible-confirmation").hide(); }, 2500);
      } else {
        userName = "anonymous";
        $("#anonymous-confirmation").show();
        $timeout(function() { $("#anonymous-confirmation").hide(); }, 2500);
      }
    };

    //CODE TO ENTER THE OBJECT IN FIREBASE DATABASE
    this.submit = function (id) {
      let userMessage = (id == 'plus') ? this.userMessagePlus : this.userMessageMinus;
      var ref = new Firebase("https://vyapi.firebaseio.com/rooms/" + roomID);
      var dashboard;
      var num;
      if (id == 'plus')
        dashboard = new Firebase(ref + "/pos");
      else
        dashboard=new Firebase(ref+"/neg");

      dashboard.once("value",(snapshot)=>{
        num = parseInt(snapshot.val());
        num++;
        if(id =='plus')
          ref.update({pos : num});
        else
          ref.update({neg : num});
      });

      if (userMessage) {
        if(!userName) userName = "anonymous";
        // $log.log(authData);

        this.messages.$add({
          from: userName,
          uid: userId,
          text: userMessage,
          lane: id,
          dl: 0
        });

        var children = $(`#chat-messages-${id} .sticky`);
        for(var c = 0; c < children.length; ++c) {
          (new Firebase(roomURL + "/" + children[c].id)).setPriority(c);
        }

        if(id == "plus")
          this.userMessagePlus = '';
        else if(id == "minus" )
          this.userMessageMinus = '';

      }
    };

    //CODE TO DISPLAY THE 5 SECOND NOTIFICATION FOR ANONYMITY
    $('#anonymousWarn').fadeIn().delay(5000).fadeOut();

    //CODE TO COUNT THE NO. OF LIKES ON A MESSAGE
    (new Firebase(roomURL)).on('child_added', (messagesObj) => {
      (new Firebase(encodeURI(roomURL + "/" + messagesObj.key() + "/like"))).on('value', (userId) => {
          let fredNameRef = new Firebase(roomURL + "/" + messagesObj.key());
          fredNameRef.update({ dl: userId.numChildren() });
      });
    });

    //handle like button click for a message
    this.like = function(msg) {
      let googleId = msg.$id;
      if(msg.uid == userId) {
        this.hideAllNotifications();
        $("#like-denied").show();
        $timeout(function() { $("#like-denied").hide(); }, 2500);
      }
      else {
        let msgLike = (new Firebase(roomURL)).child(msg.$id + "/like/" +userId);
        msgLike.once("value" , function(value){
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
    }

    //CODE TO ENABLE DRAG AND DROP OF STICKYs
    $("#chat-messages-plus").disableSelection();
    $("#chat-messages-minus").disableSelection();

    $("#chat-messages-plus").sortable({
      start: function(event, ui) { //dragging started
        ui.item.startHtml = ui.item.html();
        ui.item.html('<div style="display: inline-block;" class="zoom" >' + ui.item.startHtml + '</div>');
      },
      stop: function(event, ui) {
        ui.item.html(ui.item.startHtml);
      },
      change: function(event, ui) { //every time ordering changes
      },
      revert: true, //smooth come back when sticky move fails
      cursor: "move", //change cursor while dragging
      update: function(event, ui) { //sort operation complete
        ui.item.html(ui.item.startHtml);
//         var children = $('#chat-messages-plus')[0].childNodes;
//         for(var c in children) {
//           if(children[c].nodeName == "LI") {
//             console.log(children[c].childNodes[0].getAttribute('id'));
//           }
//         }
        var currPriority = 1;
        var children = $("#chat-messages-plus .sticky");
        for(var c in children) {
          if(children[c].id) {
            (new Firebase(roomURL + "/" + children[c].id)).setPriority(currPriority);
            currPriority++;
          }
        }
      }
    });

    $("#chat-messages-minus").sortable({
      start: function(event, ui) {
        ui.item.startHtml = ui.item.html();
        ui.item.html('<div style="display: inline-block;" class="zoom" >' + ui.item.startHtml + '</div>');
      },
      stop: function(event, ui) {
        ui.item.html(ui.item.startHtml);
      },
      change: function(event, ui) {
      },
      revert: true,
      cursor: "move",
      update: function(event, ui) {
        ui.item.html(ui.item.startHtml);
        var currPriority = 1;
        var children = $('#chat-messages-minus .sticky');
        for(var c in children) {
          if(children[c].id) {
            (new Firebase(roomURL + "/" + children[c].id)).setPriority(currPriority);
            currPriority++;
          }
        }
      }
    });

    //CODE TO DELETE THE MESSAGE POSTED
    this.delete=function(msg,temp){
      var result=$window.confirm("This card will be deleted. Are you sure?");
      if(result)
      {
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
        });

        let messageId=msg.$id;
        if(msg.uid === userId){
          this.msgRef.child(messageId).remove();
        }

        this.hideAllNotifications();
        $("#delete-confirmation").show();
        $timeout(function() {
          $("#delete-confirmation").hide();
        }, 2500);
      }
    };

    //CODE TO SHOW THE EDIT BUTTON ONLY ON SELF STICKYs
    this.getListId = function (msgId) {
      return msgId;
    }

    //CODE TO EDIT THE STICKY NOTES
    this.isOwner = function (msgId) {
      if (msgId === userId)
        return true;
      else
        return false;
    }

    this.currentMessageText = "hello";
    this.currentMessage;

    this.edit = function(msg) {
      this.currentMessageText= msg.text;
      this.currentMessage = msg;
      // // $('#stickyTextarea').setAttribute("disabled","disabled");
      // $('#stickyTextarea').focus();
      // $('.edit-btn').css({'display' : 'none'});
      // $('.save-btn').css({'display' : 'inline-block'});
    }

    this.saveEdit = function (msg) {
      (new Firebase(roomURL + "/" + msg.$id+"/text")).set(msg.text);
      /*if(msg.uid == userId) {
        $('.edit-btn').css({'display' : 'inline-block'});
        $('.save-btn').css({'display' : 'none'});
        $('#stickyTextarea').blur();
        // $('#stickyTextarea').removeAttribute("disabled");
      }*/
    }

    this.anonymousImage = function(msg){
      if(msg.from != "anonymous")
        return false;
      else
        return true;
    }

    this.userPic = [];
    this.getUserPic = function(userId){
      if(angular.isUndefined(this.userPic[userId]))
      {
        (new Firebase ("https://vyapi.firebaseio.com/users/" + userId+ "/picture")).once("value",(snapshot)=>{
          this.userPic[userId] = snapshot.val();
        });
      }
      return this.userPic[userId];
    }

    //CODE TO LIMIT THE CHARACTER IN TEXTAREA
    $('.sticky-textarea').keypress(function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
      }
    });
  }
}
