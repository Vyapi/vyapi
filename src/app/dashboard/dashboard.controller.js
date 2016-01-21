export class DashboardController {
	constructor ($firebaseArray,dashboardService){
		'ngInject';
        
		this.abc(dashboardService)


		let rootURL = 'https://vyapi.firebaseio.com/';
		let roomsURL = rootURL + 'rooms';
		let rootRef = new Firebase(rootURL);
		let roomsRef = new Firebase(roomsURL);
		let data = $firebaseArray(roomsRef);
		let authData = rootRef.getAuth();
		let userID = authData.uid;
		this.rooms = [];
		this.createRoom=function(){
			this.create(dashboardService);
		}
        //this.createRoom(dashboardService);

		//this.createRoom = function(){
		//	let roomName=prompt('Room Name','Default');
			//this.answer = DashboardService.cac();
			//console.log(userID,roomName);
		//	roomsRef.push({roomName : roomName, ownedBy : userID, members:[userID]});
		//};
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
		console.log("room created");
	}

	abc(dashboardService)
	
		{
			var t=dashboardService.getsrc();
			console.log(t);
		}
	
}
