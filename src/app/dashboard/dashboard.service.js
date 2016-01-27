export class Dashboard{
<<<<<<< HEAD
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
  createRoom(userID,roomName){
  	
		let newRoom = this.roomsRef.push({roomName : roomName, ownedBy : userID});
        this.rootRef.child("messages/"+ newRoom.key()).set(roomName);
		return;
	
  }
=======
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
>>>>>>> b62bb43d0c136b0b1523182db315f1c9f3805f3e
}
