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


	createRoom(userID,roomName,d){
		this.roomsRef.push({roomName : roomName, ownedBy : userID, date: d, pos:0, neg:0});
		return;
  }

}
