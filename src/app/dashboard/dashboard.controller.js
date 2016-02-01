export class DashboardController {
	constructor ($firebaseArray,Auth,Dashboard,$location,$log,$window,$cookies){
		'ngInject';
		this.path = $location.absUrl().replace('dashboard', 'room');
		this.location = $location;
		this.cookies = $cookies;
		this.auth = Auth;
		this.clog = $log;
		this.rooms = [];
		this.userPic = '';
		this.car= [];
		this.roomName='';
		this.plusName='';
		this.minusName='';
		this.actionName='';
		this.rName='';
		this.aName='';
		this.mName='';
		this.pName='';
		this.editKey='';
		this.cards(Dashboard);
		this.setParam(Dashboard);

		this.createRoom = function(){
			if(!this.roomName)
			{
				return false;
			}
			else
			{
				this.create(Dashboard);
			}
		};
		this.removeRoom = function(roomKey){
			this.remove(Dashboard,roomKey);
		};
		this.editRoom = function(roomKey){
			this.edit(Dashboard,roomKey);
		};
		this.saveValues = function(){
			this.save(Dashboard);
		};
		// Changes to redirect to cookie path
		var path = $cookies.get('path');
		if(path){
			$cookies.remove('path');
			$location.path(path);
		}
		// Finish of changes to cookie path
	}

	cards(Dashboard)
	{
		let card_count=0;
		let car = [];
		let userID = Dashboard.getUserID();
		if(!userID){
			return;
		}
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
		if(!Dashboard)
		{
			return;
		}
		let userID = Dashboard.getUserID();
		if(!userID){
			console.log("In !userid");
			this.rooms = ["mock data"];
			return "set param is being called";
		}
		let userPromise = Dashboard.getUserPic(userID);
		userPromise.on("value",(snapshot)=>{
			this.userPic= snapshot.val().google.profileImageURL;
		});
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
		});
	}
	create(Dashboard)
	{
		let userID = Dashboard.getUserID();
		if(!userID)
			return;
		let d=new Date();
		let p= d.toDateString();
		Dashboard.createRoom(userID,this.roomName,this.plusName,this.minusName,this.actionName,p);
	}

	remove(Dashboard,roomKey){
		Dashboard.remove(roomKey);
	}

	firebaseAuthlogout(){
    this.auth.logout()
    this.clog.log("Logged out");
    this.location.path('/');
  }

  edit(Dashboard,roomKey){
    this.editKey = roomKey;
    let currentRoom = _.find(this.rooms,{key : roomKey});
    this.rName = currentRoom.roomName;
    this.pName = currentRoom.plusLabel;
    this.mName = currentRoom.minusLabel;
    this.aName = currentRoom.actionLabel;
    Dashboard.editRoom();
  }

  save(Dashboard){
    Dashboard.saveValues(this.editKey,this.rName,this.pName,this.mName,this.aName);
  }
}
