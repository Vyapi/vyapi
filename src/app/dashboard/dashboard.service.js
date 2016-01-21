export class DashboardService {
  constructor ($firebaseArray) {
    'ngInject';
 
		let rootURL = 'https://vyapi.firebaseio.com/';
		let roomsURL = rootURL + 'rooms';
		let rootRef = new Firebase(rootURL);
		let roomsRef = new Firebase(roomsURL);
		let data = $firebaseArray(roomsRef);
		//let authData = rootRef.getAuth();
		//let userID = authData.uid;
		let userID="ayushi";
		this.rooms = [];

   this.test="abc";
}
createRoom()
{
	let rootURL = 'https://vyapi.firebaseio.com/';
	let roomsURL = rootURL + 'rooms';
	let roomsRef = new Firebase(roomsURL);
	let userID="ayushi";
	//onsole.log("In service");
	let roomName=prompt('Room Name','Default');
	roomsRef.push({roomName : roomName, ownedBy : userID, members:[userID]});
	return this.test;
		
}
   getsrc(){
   	return this.test;
   }


}