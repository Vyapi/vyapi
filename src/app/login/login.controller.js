export class LoginController {
  constructor ($firebaseObject,$firebaseAuth,$log) {
    'ngInject';
    this.ref = new Firebase("https://vyapi.firebaseio.com");
    this.fa = $firebaseAuth;
    this.clog = $log;
  }
  firebaseAuthLogin() {
    this.authObj = this.fa(this.ref);
    var authData = this.authObj.$getAuth();
    if (authData) {
      this.clog.log("Already Logged in as:", authData.uid);
    } else {
      this.authObj.$authWithOAuthPopup("google").then(function(authData) {
        console.log("111Logged in as:", authData.uid);
        var ref = new Firebase("https://vyapi.firebaseio.com");
        ref.child("users/"+ authData.uid).set(authData);
        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        this.clog.error("Authentication failed:", error);
      });
    }
  }

  firebaseAuthStatus() {
    this.authObj = this.fa(this.ref);
    var authData = this.authObj.$getAuth();
    if (authData) {
      this.clog.log("Logged in as:", authData.uid);
    } else {
      this.clog.log("Logged out");
    }
  }

  firebaseAuthlogout() {
    this.authObj = this.fa(this.ref);
    var authData = this.authObj.$getAuth();
    if (authData) {
      this.authObj.$unauth();
      this.clog.log("Successfully Logged out");
    } else {
      this.clog.log("Already Logged out");
    }
  }
}
