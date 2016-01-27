export class ActionController {
  constructor($firebaseArray, $stateParams,$log) {

    'ngInject';
    this.person='';
    this.items='';
    this.text='';
    this.assignee=[];
    this.clog = $log;

    this.roomID=$stateParams.roomKey;

    var roomRef = new Firebase('https://vyapi.firebaseio.com/rooms/'+this.roomID);
    var room = roomRef.child("members");
    room.on("value", (snapshot) => {
      snapshot.forEach((uid)=>{
        var personRef = new Firebase('https://vyapi.firebaseio.com/users/');
        var googleData=personRef.child(''+uid.key()+'/google/');
        $firebaseArray(googleData);
        googleData.on('value',(userSnapshot)=>{
          var userNames=userSnapshot.val()['displayName'];
          console.log('pushed', userNames);
          this.assignee.push(userNames);
        });
      });
    });


    this.myDataRef = new Firebase('https://vyapi.firebaseio.com/action/'+this.roomID);
    this.items=$firebaseArray(this.myDataRef);
    this.myDataRef.on('value',(snapshot)=>{
      let actions=snapshot.val();
      this.items = _.map(actions,(action,key)=>{
        action.key=key;
        return action;
      });
      console.table(this.items);
    });
  }

  hover()
  {
    $('.button-id').css({'visibility' : 'visible'});
    console.log('hover');
  }

  show()
  {
    $('.button-id').css({'visibility' : 'hidden'});
    console.log('show');
  };


  add()
  {
    this.items.push({task:this.text,name:this.person});
    console.log(this.roomID);
    this.myDataRef.push({task:this.text,name:this.person});
    this.text = '';
  }

  change(person)
  {
    this.person=person;
  }

  modify(person)
  {
    this.clog.log('modify'+person.name);
    this.myDataRef.child(person.key).set({task:person.task,name:person.name});
    this.person=person;
  }

  remove(item)
  {
    this.myDataRef.child(item.key).remove();
  }
}
