export class Dashboard{

  constructor ($firebaseArray) {

    'ngInject';
    this.rootURL = 'https://vyapi.firebaseio.com/';
    this.rootRef = new Firebase(this.rootURL);
    this.roomsURL = this.rootURL + 'rooms';
    this.roomsRef = new Firebase(this.rootURL + 'rooms');
    this.messageRef = new Firebase(this.rootURL + 'messages');
    let data = $firebaseArray(this.roomsRef);
  }
  getRooms(userID){
    if(!userID)
      return;
    return this.roomsRef.orderByChild("ownedBy").equalTo(userID)
  }
  getUserID(){
    let authData = this.rootRef.getAuth();
    if(!authData)
      return;
    return authData.uid;
  }
  remove(roomKey){
    let messageDbRef = new Firebase(this.messageRef + '/' + roomKey);
    messageDbRef.remove();
    let roomDbRef = new Firebase(this.roomsURL + '/' + roomKey);
    roomDbRef.remove();
    return;
  }
  createRoom(userID,roomName, plusName,minusName,actionName,d){
    console.log(userID);
    console.log("service");
    this.roomsRef.push({roomName : roomName, ownedBy : userID, plusLabel : plusName, minusLabel : minusName, actionLabel : actionName,date: d, pos:0, neg:0});
    $('#myModal').modal('hide');
    return;
  }
  editRoom(){
    $('#editModal').modal('show');

  }

  saveValues(roomKey,rName, pName, mName, aName){
    console.log("hello service");
    console.log(roomKey);
    let roomDbRef = new Firebase(this.roomsURL + '/' + roomKey);
    roomDbRef.update({
      roomName : rName, plusLabel : pName, minusLabel : mName, actionLabel : aName
    });
    $('#editModal').modal('hide');
    return;
  }
}
