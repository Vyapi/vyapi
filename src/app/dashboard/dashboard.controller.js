export class DashboardController {

  constructor ($firebaseArray,Dashboard,$location,$log,$window){
    'ngInject';

    this.path = $location.absUrl().replace('dashboard', 'room');
    this.setParam(Dashboard);
    this.cards(Dashboard);
    this.setParam(Dashboard);
    this.rooms = [];
    this.car= [];
    this.roomName='';
    this.plusName='';
    this.minusName='';
    this.actionName='';
    this.rName='';
    this.aName='';
    this.mName='';
    this.pName='';
    this.editKey='';

    this.createRoom = function(){
      //console.log("function call");
      if(!this.roomName)
      {
        return false;
      }
      else{
        this.create(Dashboard);
      }
    };
    this.removeRoom = function(roomKey){
      this.remove(Dashboard,roomKey);
    };
    this.editRoom = function(roomKey){
      this.edit(Dashboard,roomKey);
    };
    this.saveValues = function(){
      this.save(Dashboard);
    };
  }

  cards(Dashboard)
  {
    let card_count=0;
    let car = [];
    let userID = Dashboard.getUserID();
    Dashboard.getRooms(userID).on("value",(snapshot)=>{
      snapshot.forEach(function(childSnapshot){
        var n = childSnapshot.child("members").numChildren();
        car[card_count]=parseInt(n);
        card_count++;
      });
      this.car= car;
      return car;
    });
  }

  setParam(Dashboard){
    let userID = Dashboard.getUserID();
    let roomsPromise = Dashboard.getRooms(userID);
    if(!roomsPromise)
      return;
    roomsPromise.on("value",(snapshot)=>{
      let i=0;
      let rooms = snapshot.val();
      rooms = _.map(rooms,(room,key,url,mem,msg,date)=>{
        let temp;
        room.key = key;
        room.url = this.path + '/' +  key;
        room.mem = this.car[i];
        i++;
        return room;
      });
      this.rooms = rooms;
      console.table(this.rooms);

    });
  }

  create(Dashboard){
  //console.log("controller");
  let userID = Dashboard.getUserID();
  let d=new Date();
  let p= d.toDateString();
  Dashboard.createRoom(userID,this.roomName,this.plusName,this.minusName,this.actionName,p);
}

remove(Dashboard,roomKey){
  Dashboard.remove(roomKey);
}

firebaseAuthlogout()
{
  let ref = new Firebase("https://vyapi.firebaseio.com");
  ref.unauth();
  this.windowLoc.location.href='/';
}


edit(Dashboard,roomKey){
  this.editKey = roomKey;
  let currentRoom = _.find(this.rooms,{key : roomKey});
  console.log(currentRoom);
  this.rName = currentRoom.roomName;
  this.pName = currentRoom.plusLabel;
  this.mName = currentRoom.minusLabel;
  this.aName = currentRoom.actionLabel;
  Dashboard.editRoom();
//console.log(rName,pName,mName,aName);
}

save(Dashboard){
  console.log("hello controller");
  Dashboard.saveValues(this.editKey,this.rName,this.pName,this.mName,this.aName);
}
}
