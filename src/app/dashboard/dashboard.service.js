export class Dashboard{
  constructor ($firebaseArray) {
	  'ngInject';
	  this.rootURL = 'https://vyapi.firebaseio.com/';
	  this.rootRef = new Firebase(this.rootURL);
	  this.roomsURL = this.rootURL + 'rooms';
	  this.roomsRef = new Firebase(this.rootURL + 'rooms');
	  this.baseURL = 'https://vyapi.firebaseapp.com/rooms';
	  let data = $firebaseArray(this.roomsRef);
  }
  getRooms(userID){
	  return this.roomsRef.orderByChild("ownedBy").equalTo(userID)
  }
  getUserID(){
	  let authData = this.rootRef.getAuth();
	  return authData.uid;
  }
  createRoom(userID){
	let roomName=prompt('Room Name','Default');
	if(!roomName){
		alert('Please enter a valid room name');
	}
	else{
		this.roomsRef.push({roomName : roomName, ownedBy : userID});
		return;
	}
  }
  getBaseURL(){
	  return this.baseURL;
  }
}
