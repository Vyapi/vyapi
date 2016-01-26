export class FireData{
  constructor(FireConnect){
    'ngInject';
    this.fc = FireConnect;
    this.authObj = null;
    this.authData = this.authObj.$getAuth();
    // for rooms
    this.roomPath = '/rooms';
    this.messagesPath = '/messages';
  }

  getAuthData(){
    var authObjLocal = this.fc.connect('/')
    return authObjLocal.$getAuth();
  }

  authExist(path='/'){
    var authObjLocal = this.fc.connect(path);
    var authDataLocal = authObjLocal.$getAuth();
    if (authDataLocal) {
      return authDataLocal;
    }
    else
    {
      return false;
    }
  }

  getUid(){
    var authDataLocal = this.authExist();
    return authDataLocal.uid;
  }
}
