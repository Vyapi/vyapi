export class UserController {
  constructor($firebaseArray) {
    'ngInject';
    var appURL = "https://incandescent-inferno-4532.firebaseio.com/";
    var onlineUsersRef = new Firebase(appURL + "onlineUsers");
    this.onlineUsers = [];
    var t = $firebaseArray(onlineUsersRef); //no idea what this line does, but removing this criples whole application
    this.goOnline = function() {
      //get uid from cookie or from wherever the authentication teams decides
      var uid = Math.floor(Math.random() * 999999999) + 1;
      //hard coding right now
      uid = "google:110298804653203543045"
      console.log("My uid is: " + uid);
      //check self connection state
      var connectedRef = new Firebase(appURL + ".info/connected");
      connectedRef.on("value", (snap) => {
        if (snap.val() === true) {
          console.log("connected");
          //register self as online
          (new Firebase(encodeURI(appURL + "userAuthInfo/" + uid + "/google/cachedUserProfile/given_name/"))).once("value", (value) => {
            var userName = value.val();
            (new Firebase(encodeURI(appURL + "userAuthInfo/" + uid + "/google/profileImageURL/"))).once("value", (value) => {
              var profileImageURL = value.val();
              onlineUsersRef.child(uid).set({name: userName, photo : profileImageURL});
            });
          });
          
          //setup offline mechanism when going offline
          onlineUsersRef.child(uid).onDisconnect().remove();
        } else {
          console.log("not connected");
        }
      });
      
      //user came online
      onlineUsersRef.on('child_added', (userId) => {
        console.log("User: " + userId.key() + " came online");
        this.onlineUsers.push(userId.val());
        console.table(this.onlineUsers);
      });
      //user went offline
      onlineUsersRef.on('child_removed', function(userId) {
        console.log("User: " + userId.key() + " went offline");
      });
    }
    this.goOnline();
  }
}
