export class Auth{
  constructor(FireData,FireConnect,$log,$location){
    'ngInject';
    this.clog = $log;
    this.fireData = FireData;
    this.fireConnect = FireConnect;
    this.location = $location;
  }

  login(){
    var auth = this.fireData.authExist();
    if(auth){
      this.clog.log("User is alredy logged in");
      this.location.path('/dashboard');
    }
    else{
      var objLocal = this.fireConnect.connect();
      var dataLocal = objLocal.$getAuth();
      var ref = this.fireConnect.getRef();
      objLocal.$authWithOAuthPopup("google").then((dataLocal) =>{
        console.log('this is the data'+dataLocal);
        ref.child("users/"+ dataLocal.uid).set(dataLocal);
        this.location.path('/dashboard');
        return true;
      }).catch(function(error){
        this.clog.error("Authentication failed:", error);
        return false;
      });

    }
  }

  logout(){
    var objLocal = this.fireConnect.connect();
    var auth = this.fireData.authExist();
    if(auth){
      objLocal.$unauth();
    }
    return;
  }
}
