export class DashboardController {
	constructor ($firebaseArray,Dashboard,$location){
		'ngInject';
        this.path = $location.absUrl().replace('dashboard', 'room');
        console.log(this.path);
		this.set_param(Dashboard);
		this.cards(Dashboard);
		this.rooms = [];
		this.car= [];
		this.roomname='';
		this.createRoom = function(){
			if(this.roomname === '')
			{ 
              return false;
			}
            else{
			this.create(Dashboard);
			$.modal.close();
		}
		};
	}
	cards(Dashboard)
	{
		let i=0;
		let userID = Dashboard.getUserID();
		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			let car =[];
			snapshot.forEach(function(childSnapshot){
                var n = childSnapshot.child("members").numChildren();
			    car[i]=parseInt(n);
			    i++;
			});
			return car;
		});
		this.car= car;
		console.table("in car",this.car);
	}
	set_param(Dashboard){
		let userID = Dashboard.getUserID();
		Dashboard.getRooms(userID).on("value",(snapshot)=>{
			let rooms = snapshot.val();
			rooms = _.map(rooms,(room,key,url,no_of_mem,test)=>{
				room.key = key;
				room.url = this.path + '/' +  key;
				snapshot.forEach(function(childSnapshot){
                var n = childSnapshot.child("members").numChildren();
                room.no_of_mem=n;
                //console.log()
            });
				return room;
			});
			this.rooms = rooms;
			//console.table(this.rooms);
		});
	}
	create(Dashboard){
		let userID = Dashboard.getUserID();
		let random = Dashboard.createRoom(userID,this.roomname);
	}

	firebaseAuthlogout() 
	{
   let ref = new Firebase("https://vyapi.firebaseio.com");
   ref.unauth();
   window.location.href='/';
 }
}
