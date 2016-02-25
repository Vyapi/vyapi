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
    this.authObj = this.fa(this.getRef(path));
    //this.clog.info(`connect called`);
    return this.authObj;
  }

  getRef(path='/'){
    return new Firebase(`${this.firebaseURL}${path}`);
  }

  getUserAuthObj(path='/'){
    if(this.authObj == null) {
      //this.clog.info(`fresh auth fetch`);
      this.authObj = this.fa(this.getRef(path));
    }
    //this.clog.info(`CACHED auth send`);
    return this.authObj;
  }
}
