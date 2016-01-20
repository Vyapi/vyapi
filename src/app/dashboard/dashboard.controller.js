export class DashboardController {
  constructor () {
    'ngInject';
    	var userID = "monica";
    	var roomsURL = 'https://mock-vyapi.firebaseio.com/rooms';
	var roomsRef = new Firebase(roomsURL);
	this.rooms = [];
	this.createRoom = function(userID){
		var roomName=prompt('Room Name','Default');
		console.log(userID,roomName);
		roomsRef.push({roomName : roomName, ownedBy : userID});
	};
	roomsRef.orderByChild("ownedBy").equalTo(userID).on("value",(snapshot)=>{
		let rooms = snapshot.val();
		rooms = _.map(rooms,(room,key,url)=>{
			room.key = key;
			room.url = roomsRef + '/' + key;
			return room;
		});
		this.rooms = rooms;
		console.table(this.rooms);
		console.table(rooms);
		/*
		this.rooms = {};
		for(var key in rooms){
			var name = snapshot.child(rooms[key] + '/roomName').val();
			var url = roomsURL + '/' + rooms[key];
			this.rooms[name] = url;
		}
		console.log(this.rooms);
		*/
	});
  }
}
