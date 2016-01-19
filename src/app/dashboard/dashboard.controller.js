export class DashboardController {
  constructor () {
    'ngInject';
    		var rootURL = 'https://mock-vyapi.firebaseio.com';
		var rootRef = new Firebase(rootURL);
		var membersRef = new Firebase(rootURL + '/members');
		var roomsRef = new Firebase(rootURL + '/rooms');
		var messagesRef = new Firebase(rootURL + '/messages');
		var roomURLs = [];
		membersRef.once("value",function(snapshot){
				if(snapshot.exists()){
					console.log("members available");
					var members = snapshot.val();
					var roomLength = Object.keys(members).length;
					var key = Object.keys(members);
					console.log(key);
					console.log(roomLength);
					
				}
				else
				{
					return roomURLs;
				}
		});
		/*
		var data = $firebaseObject(rootRef);
		console.log(data.toString().length);
		var roomURLS = [];
		if(data.length == 0){
			console.log("empty");
			createNewRoom();
			return roomURLs;
		}
		else{
			var memberRef = new Firebase(rootURL + '/members');
			console.log("we'll see");
		}
		*/
		function createNewRoom(){
			for(var i=1;i<=10;i++){
				membersRef.push({'monica' : 'true', 'ayushi' : 'true'});
			}
		}
  }
}
