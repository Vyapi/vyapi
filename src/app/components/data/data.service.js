export class FireData{
  constructor(FireConnect,$log){
    'ngInject';
    this.fc = FireConnect;
    this.authObj = null;
    this.authData = this.authObj.$getAuth();
    // for rooms
    this.roomPath = '/rooms';
    this.messagesPath = '/messages';
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
    var authDataLocal = authExist();
    return authDataLocal.uid;
  }

  getRooms(userID){
    var ref = this.fc.connect(this.roomPath);
    return ref.orderByChild("ownedBy").equalTo(userID);
  }

  createRoom(userID){
    var ref = this.fc.connect(this.roomPath);
    let roomName=prompt('Room Name','Default');
    if(!roomName){
      alert('Please enter a valid room name');
    }
    else{
      let newRoom = ref.push({roomName : roomName, ownedBy : userID});
      return newRoom;
    }
  }



}
