export class DashboardController {
  constructor () {
    'ngInject';
    	var userID = "monica";
    	var roomsURL = 'https://mock-vyapi.firebaseio.com/rooms';
	var roomsRef = new Firebase(roomsURL);
	this.rooms = [];
	this.createRoom = function(userID,roomName){
		console.log(userID,roomName);
		roomsRef.push({roomName : roomName, ownedBy : userID});
	};
	roomsRef.orderByChild("ownedBy").equalTo(userID).on("value",(snapshot)=>{
		var rooms = Object.keys(snapshot.val());
		this.rooms = {};
		for(var key in rooms){
			var name = snapshot.child(rooms[key] + '/roomName').val();
			var url = roomsURL + '/' + rooms[key];
			this.rooms[name] = url;
		}
		console.log(this.rooms);
	});
  }
}
