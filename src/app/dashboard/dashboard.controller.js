export class DashboardController {
	constructor ($firebaseArray){
		'ngInject';
		let rootURL = 'https://vyapi.firebaseio.com/';
		let roomsURL = rootURL + 'rooms';
		let rootRef = new Firebase(rootURL);
		let roomsRef = new Firebase(roomsURL);
		let data = $firebaseArray(roomsRef);
		let authData = rootRef.getAuth();
		let userID = authData.uid;
		this.rooms = [];
		this.createRoom = function(){
			let roomName=prompt('Room Name','Default');
			//console.log(userID,roomName);
			roomsRef.push({roomName : roomName, ownedBy : userID, members:[userID]});
		};
		roomsRef.orderByChild("ownedBy").equalTo(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key)=>{
				room.key = key;
				room.url = `/room/${key}`;
				return room;
			});
			this.rooms = rooms;
		});
	}
}
