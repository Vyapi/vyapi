export class Auth{
    constructor(FireData,FireConnect,$log,$location, $localStorage){
        'ngInject';
        this.clog = $log;
        this.fireData = FireData;
        this.fireConnect = FireConnect;
        this.location = $location;
        
        this.googleLogout = function() {
          delete $localStorage.userInfo;
          delete $localStorage.auth;
        }
    }

    login(){
        return new Promise((resolve, reject) => {
          var auth = this.fireData.authExist();
          if(auth){
              //this.clog.log("User is alredy logged in");
              resolve(true);
          }
          else{
              var objLocal = this.fireConnect.getUserAuthObj();
              var dataLocal = objLocal.$getAuth();
              var ref = this.fireConnect.getRef();
              objLocal.$authWithOAuthPopup("google").then((dataLocal) =>{
                  //console.log('this is the data');
                  //console.log(dataLocal);
                  ref.child("users/"+ dataLocal.uid).set(dataLocal);
                  resolve(true);
              }).catch(function(error){
                  reject(error);
              });
          }
        });
    }

    logout(){
        var objLocal = this.fireConnect.getUserAuthObj();
        var auth = this.fireData.authExist();
        if(auth){
            objLocal.$unauth();
        }
        return true;
    }
}
