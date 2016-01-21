export class UserController {
  constructor($firebaseArray, $firebaseAuth, $log) {
    'ngInject';
    var appURL = "https://vyapi.firebaseio.com/";
    var onlineUsersRef = new Firebase(appURL + "onlineUsers/");
    this.onlineUsers = {};
    var t = $firebaseArray(onlineUsersRef); //no idea what this line does, but removing this criples whole application
    this.goOnline = function() {
      
      var uid;
      this.fa = $firebaseAuth;
      this.ref = new Firebase(appURL);
      this.authObj = this.fa(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        $log.log("Logged in as:", authData.uid);
        uid = authData.uid;
      } else {
        $log.error("Not Logged it. Please login");
        return;
      }
      
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
              onlineUsersRef.child(uid).set({name: userName, photo : profileImageURL});
            });
          });

          //setup offline mechanism when going offline
          onlineUsersRef.child(uid).onDisconnect().remove();
        } else {
          $log.warn("not connected");
        }
      });

      //user came online
      onlineUsersRef.on('child_added', (userId) => {
        $log.log("User: " + userId.key() + " came online");
        this.onlineUsers[userId.key().replace(":", "")] = userId.val();
      });
      //user went offline
      onlineUsersRef.on('child_removed', (userId)=> {
        $log.log("User: " + userId.key() + " went offline");
        delete this.onlineUsers[userId.key().replace(":", "")];
      });
      
    }
    
    this.goOnline();
  }
}
