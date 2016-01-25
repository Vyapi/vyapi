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
	  return this.roomsRef.orderByChild("ownedBy").equalTo(userID)
  }
  getUserID(){
	  let authData = this.rootRef.getAuth();
	  return authData.uid;
		}
	remove(roomKey){
		let roomDbRef = new Firebase(this.roomsURL + '/' + roomKey);
		roomDbRef.remove();
		let messageDbRef = new Firebase(this.messageRef + '/' + roomKey);
		messageDbRef.remove();
		return;
	}
  createRoom(userID){
	let roomName=prompt('Room Name','Default');
	if(!roomName){
		alert('Please enter a valid room name');
	}
	else{
		let newRoom = this.roomsRef.push({roomName : roomName, ownedBy : userID});
        //this.rootRef.child("messages/"+ newRoom.key()).set(roomName);
		return;
	}
  }
}
