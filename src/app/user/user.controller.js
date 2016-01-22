export class UserController {
  constructor($firebaseArray, $firebaseAuth, $log, $location, $window, $stateParams) {
    'ngInject';
    
    var appURL = "https://vyapi.firebaseio.com/";
    var onlineUsersRef = new Firebase(appURL + "onlineUsers/");
    this.onlineUsers = {}; //angular is watching this array
    var t = $firebaseArray(onlineUsersRef); //no idea what this line does, but removing this cripples whole application
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
        alert("Not Logged it. Please login\n Redirecting to login page");
        $window.location.href = "http://" + $window.location.host + "#/";;
        $log.error("Not Logged it. Please login");
        return;
      }
      
      //get roomId from URL
      var roomId = $stateParams.roomKey;
      $log.log("You opened room: " + roomId);
      
      //check self connection state
      var connectedRef = new Firebase(appURL + ".info/connected");
      connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
          $log.log("connected");
          //register self as online
          (new Firebase(encodeURI(appURL + "users/" + uid + "/google/cachedUserProfile/given_name/"))).once("value", (value) => {
            var userName = value.val();
            (new Firebase(encodeURI(appURL + "users/" + uid + "/google/profileImageURL/"))).once("value", (value) => {
              var profileImageURL = value.val();
              onlineUsersRef.child(roomId + "/" + uid).set({name: userName, photo : profileImageURL});
            });
          });
          
          //verify the room id existance
          (new Firebase(appURL + "rooms/")).orderByKey().equalTo(roomId).on("value", (snap)=>{
            if(snap.exists() == false) {
              $log.error("Room: " + roomId + " does not exist")
              alert("Room: " + roomId + " does not exist.\nRedirecting to dashboard");
              $window.location.href = "http://" + $window.location.host + "#/dashboard";
            }
          });
          
          //add self to members of the room
          (new Firebase(appURL + "rooms/" + roomId + "/members/" + uid)).set("0"); //0 is insignificant

          //setup offline mechanism when going offline
          onlineUsersRef.child(roomId + "/" + uid).onDisconnect().remove();
        } else {
          $log.warn("not connected");
        }
      });

      //user came online
      onlineUsersRef.child(roomId).on('child_added', (userId) => {
        $log.log("User: " + userId.key() + " came online");
        this.onlineUsers[userId.key().replace(":", "")] = userId.val();
      });
      
      //user went offline
      onlineUsersRef.child(roomId).on('child_removed', (userId)=> {
        $log.log("User: " + userId.key() + " went offline");
        delete this.onlineUsers[userId.key().replace(":", "")];
      });
      
    }
    
    this.goOnline();
  }
}
