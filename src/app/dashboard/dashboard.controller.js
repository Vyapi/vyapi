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
				$.modal.close();
			}
		};
		this.removeRoom = function(roomKey){
			this.remove(Dashboard,roomKey);
		};
	}

	cards(Dashboard)
	{
		let i=0;
		let userID = Dashboard.getUserID();
		let car = [];
		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			snapshot.forEach(function(childSnapshot){
				var n = childSnapshot.child("members").numChildren();
				car[i]=parseInt(n);
				i++;
			});
		});
		this.car= car;
		console.table("in car",this.car);
	}

	setParam(Dashboard){
		let userID = Dashboard.getUserID();
		let roomsPromise = Dashboard.getRooms(userID);
		if(!roomsPromise)
			return;
		roomsPromise.on("value",(snapshot)=>{

			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url,no_of_mem,test)=>{
				room.key = key;
				room.url = this.path + '/' +  key;
				snapshot.forEach(function(childSnapshot){
					var n = childSnapshot.child("members").numChildren();
					room.no_of_mem=n;
				});
				return room;
			});
			console.table(this.rooms);
			this.rooms = rooms;
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
