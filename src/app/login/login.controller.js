export class LoginController{
  constructor($log,Auth,FireData, $state, $http, $localStorage, $location){
    'ngInject';
    this.auth = Auth;
    this.clog = $log;
    this.fd = FireData;
    this.state = $state;
    this.http = $http;
    this.location = $location;

    //check if user is logged in, and redirect accordingly
    var auth = this.fd.getAuthData();
    if(auth){
      this.state.go('dashboard');
    }
    
    this.googleAuthLogout = function() {
      delete $localStorage['id'];
    }
  }

  firebaseAuthLogin(){
    this.auth.login()
      .then(response => {
        this.state.go('dashboard');
      })
      .catch(error => {
        this.clog.error("Error in login\n" + error);
      });
  }

  firebaseAuthLogout(){
    this.auth.logout()
    this.clog.log("Logged out");
    this.location.path('/');
  }


  googleAuthLogin() {
    var client_id="662183359983-j65e9u3vetanp8n779oqohvkc55a1s4h.apps.googleusercontent.com";
    var scope="email profile";
    var redirect_uri=this.location.protocol() + '://'+ this.location.host() +':'+  this.location.port() + "/googleAuth";
    var response_type="token";
    var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
    "&response_type="+response_type;
    window.location.replace(url);
  }
}
