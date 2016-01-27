export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location){
		'ngInject';
		this.path = $location.absUrl().replace('dashboard', 'room');
		this.setParam(Dashboard);
		this.rooms = [];
		this.createRoom = function(){
			this.create(Dashboard);
		};
		this.removeRoom = function(roomKey){
			console.log(roomKey);
			this.remove(Dashboard,roomKey);
		};
	}
	setParam(Dashboard){
		let userID = Dashboard.getUserID();
		let roomsPromise = Dashboard.getRooms(userID);
		if(!roomsPromise)
			return;
		roomsPromise.on("value",(snapshot)=>{
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
