export class LoginController {
  constructor ($firebaseObject,$firebaseAuth,$log) {
    'ngInject';
    this.ref = new Firebase("https://vyapi.firebaseio.com");

    this.firebaseAuthLogin = function(){
      this.authObj = $firebaseAuth(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        $log.log("Already Logged in as:", authData.uid);
      } else {
        this.authObj.$authWithOAuthPopup("google").then(function(authData) {
          $log.log("111Logged in as:", authData.uid);
          var ref = new Firebase("https://vyapi.firebaseio.com");
          ref.child("users/"+ authData.uid).set(authData);          $log.log("Logged in as:", authData.uid);
        }).catch(function(error) {
          $log.error("Authentication failed:", error);
        });
      }
    }

    this.firebaseAuthStatus = function(){
      this.authObj = $firebaseAuth(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        $log.log("Logged in as:", authData.uid);
      } else {
        $log.log("Logged out");
      }
    }

    this.firebaseAuthlogout = function(){
      this.authObj = $firebaseAuth(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        this.authObj.$unauth();
        $log.log("Successfully Logged out");
      } else {
        $log.log("Already Logged out");
      }
    }
  }

}
