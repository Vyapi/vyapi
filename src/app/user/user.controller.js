export class UserController {
  constructor() {
    'ngInject';
    this.onlineUsers = [];
    var appURL = "https://incandescent-inferno-4532.firebaseio.com/";
    var onlineUsersRef = new Firebase(appURL + "onlineUsers");
    this.goOnline = function() {
      //get uid from cookie or from wherever the authentication teams decides
      var uid = Math.floor(Math.random() * 999999999) + 1;
      //hard coding right now
      uid = "google:110298804653203543045"
      console.log("My uid is: " + uid);
      //check self connection state
      var connectedRef = new Firebase(appURL + ".info/connected");
      connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
          console.log("connected");
          //register self as online
          onlineUsersRef.child(uid.toString()).set("1");
          //setup offline mechanism when going offline
          onlineUsersRef.child(uid.toString()).onDisconnect().remove();
        } else {
          console.log("not connected");
        }
      });
      //user came online
      onlineUsersRef.on('child_added', function(userId) {
        console.log("User: " + userId.key() + " came online");
        var userName, profileImageURL;
        (new Firebase(encodeURI(appURL + "userAuthInfo/" + userId + "/google/cachedUserProfile/given_name/"))).once("value", function(value) {
          userName = value.val();
        });
        (new Firebase(encodeURI(appURL + "userAuthInfo/" + userId + "/google/profileImageURL/"))).once("value", function(value) {
          profileImageURL = value.val();
        });
        this.onlineUsers.push({
          "name": userName
        });
      });
      //user went offline
      onlineUsersRef.on('child_removed', function(userId) {
        console.log("User: " + userId.key() + " went offline");
        pop(userId);
      });
    }
    this.goOnline();
  }
}
