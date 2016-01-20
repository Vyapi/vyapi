export class LoginController {
  constructor ($scope,$firebaseObject,$firebaseAuth) {
    'ngInject';
    this.test="Good Morning";
    this.ref = new Firebase("https://vyapi.firebaseio.com");

    this.firebaseAuthLogin = function(){
      $scope.authObj = $firebaseAuth(this.ref);
      $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
        console.log("Logged in as:", authData.uid);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }
    
    this.firebaseAuthStatus = function(){
      $scope.authObj = $firebaseAuth(this.ref);
      var authData = $scope.authObj.$getAuth();
      console.log("this works");
      if (authData) {
        console.log("Logged in as:", authData.uid);
      } else {
        console.log("Logged out");
      }
    }

    this.firebaseAuthlogout = function(){
      $scope.authObj = $firebaseAuth(this.ref);
      $scope.authObj.$unauth()
    }
  }

}
