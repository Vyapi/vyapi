export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location){
		'ngInject';

		this.path = $location.absUrl().replace('dashboard', 'room');
		this.cards(Dashboard);
		this.setParam(Dashboard);
		this.rooms = [];
		this.car= [];
		this.message = [];
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
		let card_count=0;
		let car = [];
		let userID = Dashboard.getUserID();
		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			snapshot.forEach(function(childSnapshot){
				var n = childSnapshot.child("members").numChildren();
				car[card_count]=parseInt(n);
				card_count++;
			});
			this.car= car;
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
			rooms = _.map(rooms,(room,key,url,mem,msg,date)=>{
				let temp;
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
		let d=new Date();
		let p= d.toDateString();
		console.log("in date",p);
		let random = Dashboard.createRoom(userID,this.roomName,p);
	}
	remove(Dashboard,roomKey){
		Dashboard.remove(roomKey);
	}
}
