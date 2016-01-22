export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location){
		'ngInject';
        this.path = $location.absUrl().replace('dashboard', 'room');
        console.log(this.path);
		this.set_param(Dashboard);
		this.rooms = [];
		this.createRoom = function(){
			this.create(Dashboard);
		};
	}
	set_param(Dashboard){
		let userID = Dashboard.getUserID();

		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url)=>{
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
}
