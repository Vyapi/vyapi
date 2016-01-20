export class LoginController {
  constructor ($firebaseObject,$firebaseAuth) {
    'ngInject';
    this.ref = new Firebase("https://vyapi.firebaseio.com");

    this.firebaseAuthLogin = function(){
      this.authObj = $firebaseAuth(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        console.log("Already Logged in as:", authData.uid);
      } else {
        this.authObj.$authWithOAuthPopup("google").then(function(authData) {
          console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      }
    }

    this.firebaseAuthStatus = function(){
      this.authObj = $firebaseAuth(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        console.log("Logged in as:", authData.uid);
      } else {
        console.log("Logged out");
      }
    }

    this.firebaseAuthlogout = function(){
      this.authObj = $firebaseAuth(this.ref);
      var authData = this.authObj.$getAuth();
      if (authData) {
        this.authObj.$unauth();
        console.log("Successfully Logged out");
      } else {
        console.log("Already Logged out");
      }
    }
  }

}
