export class Dashboard{
	constructor ($firebaseArray) {
		'ngInject';
		this.rootURL = 'https://vyapi.firebaseio.com/';
		this.rootRef = new Firebase(this.rootURL);
		this.roomsURL = this.rootURL + 'rooms';
		this.roomsRef = new Firebase(this.rootURL + 'rooms');
		this.messageRef = new Firebase(this.rootURL + 'messages');
		$firebaseArray(this.roomsRef);
	}
	getRooms(userID){
		if(!userID)
			return "success";
		return this.roomsRef.orderByChild("ownedBy").equalTo(userID)
	}
	getUserPic(userID){
		if(!userID)
			return "success";
		let userRef = new Firebase(this.rootURL + 'users/' + userID);
		return userRef;
	}
	remove(roomKey){
		let messageDbRef = new Firebase(this.messageRef + '/' + roomKey);
		messageDbRef.remove();
		let roomDbRef = new Firebase(this.roomsURL + '/' + roomKey);
		roomDbRef.remove();
		return "success";
	}
	createRoom(userID,roomName, plusName,minusName,actionName,d)
	{
		if(!userID)
			return "success";
		this.roomsRef.push({roomName : roomName, ownedBy : userID, plusLabel : plusName, minusLabel : minusName, actionLabel : actionName,date: d, pos:0, neg:0});
		angular.element('#myModal').modal('hide');
		return;
	}
	editRoom(){
		angular.element('#editModal').modal('show');
		return "success";
	}
	saveValues(roomKey,rName, pName, mName, aName)
	{
		let roomDbRef = new Firebase(this.roomsURL + '/' + roomKey);
		if(!rName)
			return "success";
		roomDbRef.update({
			roomName : rName, plusLabel : pName, minusLabel : mName, actionLabel : aName
		});
		angular.element('#editModal').modal('hide');
		return;
	}
}
