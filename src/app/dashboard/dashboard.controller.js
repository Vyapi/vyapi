export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location,Auth,$log){

		'ngInject';
		this.path = $location.absUrl().replace('dashboard', 'room');
		$log.log(this.path);
		// this.set_param(Dashboard);
		this.setParam(Dashboard);
		this.rooms = [];
		this.location = $location;
		this.auth = Auth;
		this.clog = $log;
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
		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key)=>{
				room.key = key;
				room.url = this.path + '/' +  key;
				//console.log(room.url);
				return room;
			});
			this.rooms = rooms;
			this.clog.table(this.rooms);
		});
	}
	create(Dashboard){
		let userID = Dashboard.getUserID();
		return Dashboard.createRoom(userID);
	}
	remove(Dashboard,roomKey){
		Dashboard.remove(roomKey);
	}
	firebaseAuthlogout(){
    this.auth.logout()
    this.clog.log("Logged out");
    this.location.path('/');
  }
}
