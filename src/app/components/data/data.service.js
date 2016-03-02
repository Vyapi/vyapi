export class FireData{
  constructor(FireConnect){
    'ngInject';
    this.fc = FireConnect;
    this.authObj = null;
    this.authData = null;
    // for rooms
    this.roomPath = '/rooms';
    this.messagesPath = '/messages';
  }

  getAuthData(){
    var authObjLocal = this.fc.getUserAuthObj('/')
    var auth = authObjLocal.$getAuth();
    return auth;
  }

  authExist(path='/'){
    var authObjLocal = this.fc.getUserAuthObj(path);
    var authDataLocal = authObjLocal.$getAuth();
    if (authDataLocal) {
      return authDataLocal;
    }
    return null;
  }

  getUid(){
    var authDataLocal = this.authExist();
    return authDataLocal.uid;
  }
}
