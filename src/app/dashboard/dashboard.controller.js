export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location){
		'ngInject';

		this.path = $location.absUrl().replace('dashboard', 'room');
		this.setParam(Dashboard);
		this.cards(Dashboard);
		this.setParam(Dashboard);
		this.rooms = [];
		this.car= [];
		this.roomName='';

		this.createRoom = function(){
			if(!this.roomName)
			{ 
				return false;
			}
			else{
				this.create(Dashboard);

			}
		};
		this.removeRoom = function(roomKey){
			this.remove(Dashboard,roomKey);
		};
	}

	cards(Dashboard)
	{
		let i=0;
		let car = [];
		let userID = Dashboard.getUserID();
		Dashboard.getRooms(userID).on("value",(snapshot)=>{

			snapshot.forEach(function(childSnapshot){
				var n = childSnapshot.child("members").numChildren();
				car[i]=parseInt(n);
				i++;
			});
			this.car= car;
			console.table(this.car);
			return car;

		});

	}

	setParam(Dashboard){
		let userID = Dashboard.getUserID();
		let roomsPromise = Dashboard.getRooms(userID);
		if(!roomsPromise)
			return;
		roomsPromise.on("value",(snapshot)=>{
			let i=0;
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url,mem)=>{
				room.key = key;
				room.url = this.path + '/' +  key;
				room.mem = this.car[i];
				i++;
				return room;
			});
			this.rooms = rooms;
			console.table(this.rooms);

		});



	}
	create(Dashboard){
		let userID = Dashboard.getUserID();
		let random = Dashboard.createRoom(userID,this.roomName);
	}
	remove(Dashboard,roomKey){
		Dashboard.remove(roomKey);
	}
}
