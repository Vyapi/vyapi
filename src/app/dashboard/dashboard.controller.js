export class DashboardController {
	constructor ($firebaseArray){
		'ngInject';
		let userID = "monica";
		let roomsURL = 'https://mock-vyapi.firebaseio.com/rooms';
		let roomsRef = new Firebase(roomsURL);
		this.rooms = [];
		this.createRoom = function(userID){
			let roomName=prompt('Room Name','Default');
			//console.log(userID,roomName);
			roomsRef.push({roomName : roomName, ownedBy : userID});
		};
		let data = $firebaseArray(roomsRef);
		roomsRef.orderByChild("ownedBy").equalTo(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url)=>{
				room.key = key;
				room.url = roomsRef + '/' + key;
				return room;
			});
			this.rooms = rooms;
			//console.table(this.rooms);
		});
	}
}
