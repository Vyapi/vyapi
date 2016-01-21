export class DashboardService {
  constructor ($firebaseArray) {
    'ngInject';
 
		this.rootURL = 'https://vyapi.firebaseio.com/';
		this.roomsURL = rootURL + 'rooms';
		this.rootRef = new Firebase(rootURL);
		this.roomsRef = new Firebase(roomsURL);
		this.data = $firebaseArray(roomsRef);
		let userID="ayushi";
		this.rooms = [];
        this.test="abc";
}
createRoom()
{
	let userID="ayushi";
	let roomName=prompt('Room Name','Default');
	roomsRef.push({roomName : roomName, ownedBy : userID, members:[userID]});
	return this.test;
		
}
   getsrc(){
   	return this.test;
   }


}