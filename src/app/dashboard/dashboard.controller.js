export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location,$log,$window){
		'ngInject';
		this.path = $location.absUrl().replace('dashboard', 'room');
		$log.log(this.path);
		this.set_param(Dashboard);
		this.rooms = [];
		this.clog = $log;
		this.windowLoc = $window;
		this.createRoom = function(){
			this.create(Dashboard);
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
			this.clog.table(this.rooms);
		});
	}
	create(Dashboard){
		let userID = Dashboard.getUserID();
		return Dashboard.createRoom(userID);
	}

	firebaseAuthlogout()
	{
		let ref = new Firebase("https://vyapi.firebaseio.com");
		ref.unauth();
		this.windowLoc.location.href='/';
	}
}
