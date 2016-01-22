export class DashboardController {
	constructor ($firebaseArray,dashboardService){
		'ngInject';
		this.set_param(dashboardService);
		this.rooms = [];
		this.createRoom = function(){
			this.create(dashboardService);
		};
	}
	set_param(dashboardService){
		let userID = dashboardService.getUserID();

		dashboardService.getRooms(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url)=>{
				room.key = key;
				room.url = dashboardService.getBaseURL() + '/' +  key;
				console.log(room.url);
				return room;
			});
			this.rooms = rooms;
			console.table(this.rooms);
		});
	}
	create(dashboardService){
		let userID = dashboardService.getUserID();
		let random = dashboardService.createRoom(userID);
	}
}
