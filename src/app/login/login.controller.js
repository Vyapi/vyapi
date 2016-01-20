export class LoginController {
  constructor ($firebaseAuth) {
    'ngInject';
    this.test="Good Morning";
    this.ref = new Firebase("https://vyapi.firebaseio.com");
    this.fa = $firebaseAuth;
  }
  firebaseAuthLogin() {
    this.authObj = this.fa(this.ref);
    this.authObj.$authWithOAuthPopup("google").then((authData) =>{
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

  firebaseAuthStatus(){
    this.authObj = this.fa(this.ref);
    var authData = this.authObj.$getAuth();
    console.log("this works");
    if (authData) {
      console.log("Logged in as:", authData.uid);
    } else {
      console.log("Logged out");
    }
  }

  firebaseAuthlogout(){
    this.authObj = this.fa(this.ref);
    this.authObj.$unauth()
  }
}
