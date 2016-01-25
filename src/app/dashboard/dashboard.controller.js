export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location){
		'ngInject';
		this.path = $location.absUrl().replace('dashboard', 'room');
		this.set_param(Dashboard);
		this.rooms = [];
		this.createRoom = function(){
			this.create(Dashboard);
		};
		this.removeRoom = function(roomKey){
			console.log(roomKey);
			this.remove(Dashboard,roomKey);
		};
	}
	set_param(Dashboard){
		let userID = Dashboard.getUserID();
		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key)=>{
				room.key = key;
				room.url = this.path + '/' +  key;
				//console.log(room.url);
				return room;
			});
			this.rooms = rooms;
			console.table(this.rooms);
		});
	}
	create(Dashboard){
		let userID = Dashboard.getUserID();
		let random = Dashboard.createRoom(userID);
	}
	remove(Dashboard,roomKey){
		Dashboard.remove(roomKey);
	}
	firebaseAuthlogout(){
		let ref = new Firebase("https://vyapi.firebaseio.com");
		ref.unauth();
		window.location.href='/';
	}
}
