export class UserController {
  constructor($firebaseArray, $firebaseAuth, $log, $location, $window, $stateParams,$cookies) {
    'ngInject';

    var appURL = "https://vyapi.firebaseio.com/";
    var onlineUsersRef = new Firebase(appURL + "onlineUsers/");
    this.messageContributions = [];
    this.onlineUsers = {}; //angular is watching this array
    this.cookies = $cookies;
    $firebaseArray(onlineUsersRef); //no idea what this line does, but removing this cripples whole application

    this.goOnline = function() {

      var uid;

      //find user ID of self
      this.fa = $firebaseAuth;
      this.ref = new Firebase(appURL);
      this.authObj = this.fa(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        $log.log("Logged in as:", authData.uid);
        uid = authData.uid;
      } else {
        var path = $location.path();
        this.cookies.put('path',path);
        alert("Not Logged in. Please login\n Redirecting to login page");
        $window.location.href = "http://" + $window.location.host + "#/";
        $log.error("Not Logged in. Please login");
        return;
      }

      //get roomId from URL
      var roomId = $stateParams.roomKey;

      //check self connection state
      var connectedRef = new Firebase(appURL + ".info/connected");
      connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
          $log.log("connected");
          //register self as online

          onlineUsersRef.child(roomId + "/" + uid).set("0");

          //verify the room id existance
          (new Firebase(appURL + "rooms/")).orderByKey().equalTo(roomId).on("value", (snap)=>{
            if(snap.exists() == false) {
              $log.error("Room: " + roomId + " does not exist");
              alert("Room: " + roomId + " does not exist.\nRedirecting to dashboard");
              $window.location.href = "http://" + $window.location.host + "#/dashboard";
              return;
            } else {
              //register self as online. add self to members of the room
              (new Firebase(appURL + "rooms/" + roomId + "/members/" + uid)).set("0"); //0 is insignificant

              //setup offline mechanism when going offline
              onlineUsersRef.child(roomId + "/" + uid).onDisconnect().remove();
            }
          });
        } else {
          $log.warn("not connected");
        }
      });

      //user came online
      onlineUsersRef.child(roomId).on("child_added", (userId) => {
        $log.log("User: " + userId.key() + " came online");

        //fetch details of the user that just came online
        (new Firebase(encodeURI(appURL + "users/" + userId.key() + "/google/cachedUserProfile/given_name/"))).once("value", (value) => {
          var userName = value.val();
          (new Firebase(encodeURI(appURL + "users/" + userId.key() + "/google/profileImageURL/"))).once("value", (value) => {
            var profileImageURL = value.val();
            this.onlineUsers[userId.key()] = {name: userName, photo : profileImageURL};
            for(var u in this.onlineUsers)
              $log.log(u);
          });
        });
      });

      //user went offline
      onlineUsersRef.child(roomId).on("child_removed", (userId)=> {
        $log.log("User: " + userId.key() + " went offline");
        delete this.onlineUsers[userId.key()];
      });

      //+1 to badge when user adds new message
      (new Firebase(appURL + "messages/" + $stateParams.roomKey)).on("child_added", (messageObj) => {
        if(messageObj.val().from == "anonymous") //let user remain anonymous by not showing his contribution
          return;

        if(this.messageContributions[messageObj.val().uid] == undefined)
          this.messageContributions[messageObj.val().uid] = 0;
        this.messageContributions[messageObj.val().uid] += 1;
      });

      //-1 to badge when user removes message
      (new Firebase(appURL + "messages/" + $stateParams.roomKey)).on("child_removed", (messageObj) => {
        if(messageObj.val().from == "anonymous") // post deleted was anonymous, so no need to decrement contribution
          return;

        this.messageContributions[messageObj.val().uid] -= 1;
      });

      //function used in ng-repeat to get contributions info
      this.getMessageContributions = function(uid) {
        if(this.messageContributions[uid] == undefined) { //no contributions done by this user
          return 0;
        }
        return this.messageContributions[uid];
      }

    } //end of this.goOnline

    this.goOnline();
  } //end of constructor
} //end of UserController
