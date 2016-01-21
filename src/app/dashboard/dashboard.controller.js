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
		this.createRoom=function(){
			this.create(dashboardService);
		}
       
		roomsRef.orderByChild("ownedBy").equalTo(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url)=>{
				room.key = key;
				room.url = roomsRef + '/' + key;
				return room;
			});
			this.rooms = rooms;
		});
	}

	create(dashboardService)
	{
		
		var k=dashboardService.createRoom();
		
	}

	abc(dashboardService)
	
		{
			var t=dashboardService.getsrc();
			console.log(t);
		}
	
}
