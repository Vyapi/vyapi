export class DashboardController {
	constructor ($firebaseArray,dashboardService){
		'ngInject';
		this.userID = '';
		this.set_param(dashboardService);
		let rootURL = 'https://vyapi.firebaseio.com/';
		let roomsURL = rootURL + 'rooms';
		let rootRef = new Firebase(rootURL);
		let roomsRef = new Firebase(roomsURL);
		let data = $firebaseArray(roomsRef);
		this.rooms = [];
		this.createRoom = function(){
			let roomName=prompt('Room Name','Default');
			//console.log(userID,roomName);
			roomsRef.push({roomName : roomName, ownedBy : this.userID, members:[this.userID]});
		};
	}
	set_param(dashboardService){
		this.userID = dashboardService.getUserID();
		this.rooms = dashboardService.getRooms();
		console.table(this.rooms);
		console.log(this.userID);
	}
}
