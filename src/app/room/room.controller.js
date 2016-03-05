export class RoomController {
  constructor ($stateParams, $scope,$log,Auth,$location,Dashboard, $localStorage) {
    'ngInject';
    this.auth = Auth;
    this.location = $location;
    this.clog = $log;
    $scope.getview=null;
    //$log.log(`roomid: ${$stateParams.roomKey }`);

    this.roomLabel = '';
    let roomK = $stateParams.roomKey;
    let roomRef = new Firebase("https://vyapi.firebaseio.com/rooms/"+roomK);
    roomRef.once("value",(snapshot)=>{
      let labelData = snapshot.val();
      this.roomLabel = labelData.roomName;
    });

    var keys = [];
    var key;
    this.messages= {}; // pr
    this.action={};// pr
    this.finalArray=[]; // pr
    this.userPic = $localStorage.userInfo['picture'];
    var userRef = new Firebase("https://vyapi.firebaseio.com/rooms/");
    userRef.on('value',(snap)=>{

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
          flag=1;
          break;
        }
      }
      if(flag==0)
      {
        $scope.getview=true;
      }

    });

    var roomId =$stateParams.roomKey;

    var ref = new Firebase("https://vyapi.firebaseio.com/messages/"+roomId);
    ref.on("value",(snapshot)=>{
      this.messages = snapshot.val();
      this.messages = _.map(this.messages,(d)=>d);
      //execute after populating messages
      var ref2 = new Firebase("https://vyapi.firebaseio.com/action/"+roomId);
      ref2.on("value",(snapshot2)=>{
        this.action = snapshot2.val();
        this.action = _.map(this.action,(d)=>d);

        this.allActions= _.groupBy(this.messages,'lane');
        let positiveActs = this.allActions.plus;
        let negativeActs = this.allActions.minus;
        let actions = this.action;
        var Length =[];
        Length[0]= positiveActs != undefined ? positiveActs.length : 0;
        Length[1]= negativeActs != undefined ? negativeActs.length : 0;
        Length[2] = this.action.length;
        var iterator = _.max(Length);

        let csv = [];
        for(var index=0;index<iterator;index++)
        {
          let obj={};
          if(positiveActs != undefined && positiveActs[index]!=undefined)
          {
            obj.Positive=positiveActs[index].text;
            obj.PositiveName=positiveActs[index].from;
          }else //FILL WITH BLANK values
          {
            obj.Positive='';
            obj.PositiveName='';
          }

          if(negativeActs != undefined && negativeActs[index]!=undefined)
          {
            obj.improve= negativeActs[index].text;
            obj.improveName= negativeActs[index].from;
          }else
          {
            obj.improve= '';
            obj.improveName= '';
          }

          if(actions[index]!=undefined)
          {
            obj.actionItem=actions[index].task;
            obj.owner= actions[index].name;
          }else
          {
            obj.actionItem='';
            obj.owner= '';
          }
          csv.push(obj);
          this.finalArray = csv;
        }
      });
    });

    this.header = ["Positive","PositiveName","improve","improveName","action","owner"];

    //CodeforExport
    this.exportSheetCreator=function(){
      this.allActions= _.groupBy(this.messages,'lane');
      let positiveActs = this.allActions.plus;
      let negativeActs = this.allActions.minus;
      let actions = this.action;
      var Length =[];
      Length[0]= positiveActs != undefined ? positiveActs.length : 0;
      Length[1]= negativeActs != undefined ? negativeActs.length : 0;
      Length[2] = this.action.length;
      var iterator = _.max(Length);

      let csv = [];
      for(var index=0;index<iterator;index++)
      {
        let obj={};
        if(positiveActs != undefined && positiveActs[index]!=undefined)
        {
          obj.Positive=positiveActs[index].text;
          obj.PositiveName=positiveActs[index].from;
        }
        if(negativeActs != undefined && negativeActs[index]!=undefined)
        {
          obj.improve= negativeActs[index].text;
          obj.improveName= negativeActs[index].from;
        }
        if(actions[index]!=undefined)
        {
          obj.actionItem=actions[index].task;
          obj.owner= actions[index].name;
        }
        csv.push(obj);
        this.finalArray = csv;
      }
      this.header = ["Positive","PositiveName","improve","improveName","action","owner"];
      //console.table(this.finalArray);
    }
    
    //sort by likes
    this.sortByLikes = function() {
      ref.orderByChild("dl").once("value", function(snapshot) {
        var arr = [];
        var val = snapshot.val();
        for(var i in val) {
          val[i].msgId = i;
          arr.push(val[i]);
        }
        //decending sort by no of likes
        arr.sort(function(a,b) {
          return b.dl - a.dl;
        });

        var link = "https://vyapi.firebaseio.com/messages/" + $stateParams.roomKey;
        for(var i = 0; i < arr.length; ++i)
            (new Firebase(link)).child(arr[i].msgId).setPriority(i);
        
      });
//       var messages = $firebaseArray(new Firebase("https://vyapi.firebaseio.com/messages/" + $stateParams.roomKey));
//       console.log("sort by likes" + messages.length);
//       messages.sort(function(a,b){
//         console.log((a.dl.split(' ')[0] +" - " + b.dl.split(' ')[0]));
//         return -(a.dl.split(' ')[0] - b.dl.split(' ')[0]);
//       });
    }
  }

  firebaseAuthlogout(){
    this.auth.logout();
    this.location.path('/');
  }
  
  googleAuthLogout() {
    this.auth.googleLogout();
    this.location.path('/');
  }
}
