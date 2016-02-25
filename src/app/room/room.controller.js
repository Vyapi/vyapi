export class RoomController {
  constructor ($firebaseAuth, $stateParams, $scope,$log,Auth,$location,Dashboard, FireData) {
    'ngInject';
    this.auth = Auth;
    this.location = $location;
    this.clog = $log;
    this.firedata = FireData;
    $scope.getview=null;
    $log.log(`roomid: ${$stateParams.roomKey }`);

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
		this.userPic = '';
		let userPromise = Dashboard.getUserPic(this.firedata.getUid());
		userPromise.on("value",(snapshot)=>{
			this.userPic = snapshot.val().google.profileImageURL;
			//console.log("hi",this.userPic);
		});
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
        Length[0]= positiveActs.length;
        Length[1]= negativeActs.length;
        Length[2] = this.action.length;
        var iterator = _.max(Length);

        let csv = [];
        for(var index=0;index<iterator;index++)
        {
          let obj={};
          if(positiveActs[index]!=undefined)
          {
            obj.Positive=positiveActs[index].text;
            obj.PositiveName=positiveActs[index].from;
          }else //FILL WITH BLANK values
          {
            obj.Positive='';
            obj.PositiveName='';
          }

          if(negativeActs[index]!=undefined)
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
      Length[0]= positiveActs.length;
      Length[1]= negativeActs.length;
      Length[2] = this.action.length;
      var iterator = _.max(Length);

      let csv = [];
      for(var index=0;index<iterator;index++)
      {
        let obj={};
        if(positiveActs[index]!=undefined)
        {
          obj.Positive=positiveActs[index].text;
          obj.PositiveName=positiveActs[index].from;
        }
        if(negativeActs[index]!=undefined)
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
      console.table(this.finalArray);
    }
  }

  firebaseAuthlogout(){
    this.auth.logout()
    this.clog.log("Logged out");
    this.location.path('/');
  }
}
