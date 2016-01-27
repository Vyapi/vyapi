export class RoomController {
  constructor ($firebaseAuth, $stateParams, $scope,$log) {
    'ngInject';
    $scope.getview=null;
    $log.info(`in room controller in room ${$stateParams.roomKey }`);
    $log.log($stateParams.roomKey);
    var keys = [];
    var key;
    //console.log("hui");
    var userRef = new Firebase("https://vyapi.firebaseio.com/rooms/");
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
          $log.log("success");
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
