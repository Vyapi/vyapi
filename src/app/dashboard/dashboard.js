var Firebase = require("firebase");
/*var myFirebaseRef = new Firebase("https://try1.firebaseio.com/");
myFirebaseRef.set({
  title: "Hello World!",
  author: "Firebase",
  location: {
    city: "San Francisco",
    state: "California",
    zip: 94103
  }
});*/
var rootRef = new Firebase('https://docs-examples.firebaseio.com/web/data');
//rootRef.child('users/mchen/name');
//myFirebaseRef.child("location/city").on("value", function(snapshot) {
  //alert(snapshot.val());  // Alerts "San Francisco"
//});