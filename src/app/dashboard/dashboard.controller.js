export class DashboardController {
  constructor () {
    'ngInject';
    		var userID = "monica";
    		var rootURL = 'https://mock-vyapi.firebaseio.com';
		var rootRef = new Firebase(rootURL);
		var membersRef = new Firebase(rootURL + '/members');
		var roomsRef = new Firebase(rootURL + '/rooms');
		var messagesRef = new Firebase(rootURL + '/messages');
		var roomURLs = [];
		membersRef.once("value",function(snapshot){
				if(snapshot.exists()){
					//console.log("members available");
					var members = snapshot.val();
					for(var membersKey in members){
						var membersVal = members[membersKey];
						for(var key in membersVal){
							//console.log(key,userID,membersVal[key])
							if(key === userID && membersVal[key]){
								roomURLs.push(membersKey);
							}
						}
						
					}
					console.log(roomURLs);

				}

		});
		function createNewRoom(){
			for(var i=1;i<=10;i++){
				membersRef.push({'monica' : 'true', 'ayushi' : 'true'});
			}
		}
  }
}
