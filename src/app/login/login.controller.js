export class LoginController{
  constructor($log,$location,Auth,FireData){
    'ngInject';
    this.auth = Auth;
    this.clog = $log;
    this.locate = $location;
    this.fd = FireData;

    //check if user is logged in, and redirect accordingly
    var auth = this.fd.getAuthData();
    if(auth){
      $location.path('/dashboard');
    }

  }
  firebaseAuthLogin(){
    var status = this.auth.login();
    this.clog.log(status);
    if(status){
      this.clog.log("Logged in");
      this.locate.path('/dashboard');
    }else{
      this.clog.log("Not logged in, error");
    }
  }

  firebaseAuthLogout(){
    this.auth.logout()
    this.clog.log("Logged out");
    this.locate.path('/');
  }
}
