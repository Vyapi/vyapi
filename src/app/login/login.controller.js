export class LoginController{
  constructor($log,Auth,FireData, $state){
    'ngInject';
    this.auth = Auth;
    this.clog = $log;
    this.fd = FireData;
    this.state = $state;

    //check if user is logged in, and redirect accordingly
    var auth = this.fd.getAuthData();
    if(auth){
      this.state.go('dashboard');
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
}
