export class DashboardService {
  constructor ($firebaseArray) {
	  'ngInject';
	  this.rootURL = 'https://vyapi.firebaseio.com/';
	  this.rootRef = new Firebase(this.rootURL);
	  this.roomsURL = this.rootURL + 'rooms';
	  this.roomsRef = new Firebase(this.rootURL + 'rooms');
	  this.userID = '';
	  this.rooms = [];
  }
  getUserID(){
	  let authData = this.rootRef.getAuth();
	  this.userID = authData.uid;
	  return this.userID;
  }
  getRooms(){
	  this.roomsRef.orderByChild("ownedBy").equalTo(this.userID).on("value",(snapshot)=>{
		this.rooms = snapshot.val();
		//rooms = _.map(rooms,(room,key,url)=>{
		//	room.key = key;
		//	room.url = this.roomsURL + '/' + key;
		//	return room;
		//});
		//this.rooms = rooms;
		//console.table(this.rooms);
	  });
	  return this.rooms;
  }
}
