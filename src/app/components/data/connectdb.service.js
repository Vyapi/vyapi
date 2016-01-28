export class FireConnect{
  constructor($firebaseAuth,$log){
    'ngInject';
    this.fa = $firebaseAuth;
    this.firebaseURL = "https://vyapi.firebaseio.com";
    this.ref = null
    this.authObj = null
    this.clog = $log;
  }

  connect(path='/'){
    this.ref = new Firebase(`https://vyapi.firebaseio.com${path}`);
    this.authObj = this.fa(this.ref);
    this.clog.info(`authObject returned, connection made to ${path}`);
    return this.authObj;
  }

  getRef(){
    this.clog.info("reference to the firebase auth returned");
    return this.ref;
  }

  getUserAuth(){
    this.clog.info("auth status of user returned");
    return this.authData;
  }
}
