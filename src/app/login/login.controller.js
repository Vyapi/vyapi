export class LoginController{
  constructor($log,$location,LoginServ,FireData){
    'ngInject';
    this.fa = LoginServ;
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
    var status = this.fa.login();
    console.log(status);
    if(status){
      this.clog.log("Logged in");
      this.locate.path('/dashboard');
    }else{
      this.clog.log("Not logged in, error");
    }
  }

  firebaseAuthLogout(){
    if(this.fa.logout()){
      this.clog.log("Logged out");
      this.locate('/');
    }
    else{
      this.clog.log("Already logged out");
    }
  }
}
