export class FireConnect{
  constructor($firebaseAuth,$log){
    'ngInject';
    this.firebaseURL = "https://vyapi.firebaseio.com";
    this.ref = new Firebase("https://vyapi.firebaseio.com");
    this.authObj = $firebaseAuth(this.ref);
    this.authData = this.authObj.$getAuth();
    this.clog = $log;
  }

  connect(){
    this.clog.log("authObject returned, connection made");
    return this.authObj;
  }

  getRef(){
    this.clog.log("reference to the firebase auth returned");
    return this.ref;
  }

  getUserAuth(){
    this.clog.log("auth status of user returned");
    return this.authData;
  }
}
