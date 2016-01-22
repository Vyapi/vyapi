export class RoomController {
  constructor ($firebaseAuth, $stateParams, $scope) {
    'ngInject';
     $scope.getview=null;
    console.info(`in room controller in room ${$stateParams.roomKey }`);
     console.log($stateParams.roomKey);
    var keys = [];
    var key;
    //console.log("hui");
    var userRef = new Firebase("https://vyapi.firebaseio.com/messages/");
    // console.log("outside file");
    userRef.on('value',(snap)=>{
     //console.log(snap.val());
      for (key in snap.val()) {
        if (snap.val().hasOwnProperty(key)) {
          keys.push(key);
        }
      }  
    //console.log(keys[0]);
     var flag=0;
     var roomId =$stateParams.roomKey;
     //console.log(roomId);
     for(key in keys)
     {
         if(keys[key]===roomId)
         {
          console.log("success");
          flag=1;
          break;
         }
     }
      if(flag==0)
      {
          $scope.getview=true;
      }
      
    });
  }  
}
