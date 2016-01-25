export class LoginController {
  constructor ($firebaseObject,$firebaseAuth,$log,$location) {
    'ngInject';
    this.ref = new Firebase("https://vyapi.firebaseio.com");
    this.fa = $firebaseAuth;
    this.clog = $log;
    this.authObj = this.fa(this.ref);
    this.direct = $location;
    var authData = this.authObj.$getAuth();
    if (authData) {
        // $window.location.href = '/dashboard';
        $location.path('/dashboard')

    }
  }

  firebaseAuthLogin() {
    this.authObj = this.fa(this.ref);
    var authData = this.authObj.$getAuth();
    var direct2 = this.direct;
    if (authData) {
      this.clog.log("Already Logged in as:", authData.uid);
    } else {
      this.authObj.$authWithOAuthPopup("google").then(function(authData) {
        var ref = new Firebase("https://vyapi.firebaseio.com");
        ref.child("users/"+ authData.uid).set(authData);
        console.log("Logged in as:", authData.uid);
        direct2.path('/dashboard');
      })().catch(function(error) {
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
    console.log('from logout method');
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
