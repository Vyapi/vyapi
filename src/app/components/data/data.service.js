export class FireAuth{
  constructor($firebaseAuth,$log){
    'ngInject';
    this.firebaseURL = "https://vyapi.firebaseio.com";
    this.ref = new Firebase("https://vyapi.firebaseio.com");
    this.authObj = $firebaseAuth(this.ref);
    this.authData = this.authObj.$getAuth();
    this.clog = $log;
  }

  connect(){
    return this.authObj
  }

  getRef(){
    return this.ref;
  }
}
