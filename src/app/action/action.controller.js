export class ActionController {
    constructor($firebaseArray, $stateParams) {

    'ngInject';
    this.person='';
    this.items='';
    this.text='';
    this.assignee=[];
//
    this.roomID=$stateParams.roomKey; //temporary
    //this.roomID='-K8rJxJaWp5N6v91fP2M';
    var roomRef = new Firebase('https://vyapi.firebaseio.com/rooms/'+this.roomID);
    var room = roomRef.child("members");
    room.on("value", (snapshot) => {
    snapshot.forEach((uid)=>{
      var personRef = new Firebase('https://vyapi.firebaseio.com/users/');
      //console.log(''+child.key()+'/google/');
      var data2=personRef.child(''+uid.key()+'/google/');
      $firebaseArray(data2);
      data2.on('value',(userSnapshot)=>{
              var userNames=userSnapshot.val()['displayName'];
              console.log('pushed', userNames);
              this.assignee.push(userNames);
              // console.log(this.assignee);
              // console.log(typeof this.assignee);
      });
    });
    // data === "hello"
  });


    //this.assignee=['mayuresh','abhimanyu','aishwarya'];
    //console.log(self);


    this.myDataRef = new Firebase('https://vyapi.firebaseio.com/action/'+this.roomID);
    this.items=$firebaseArray(this.myDataRef);
    this.myDataRef.on('value',(snapshot)=>{
    //console.log(this.items);
    let actions=snapshot.val();
    //console.log(actions);
    this.items = _.map(actions,(action,key)=>{
      action.key=key;
      //console.log("key "+action.key)
     // console.table(action);
      return action;
    });
    console.table(this.items);
    //this.myDataRef = new Firebase('https://vyapi.firebaseio.com');
    //console.log(this.items[0].key);
  });
  }

  add()
  {
    this.items.push({task:this.text,name:this.person});
    //console.log(this.roomID);
    this.myDataRef.push({task:this.text,name:this.person});
    //myDataRef.child("users/"+ authData.uid).set(authData);
    this.text = '';
  }

  change(person)
  {
    //console.log(person);
    this.person=person;
  }

  modify(person)
  {
    console.log('modify'+person.name);
    /*this.myDataRef.child('action/'+$person.key).remove();
    this.myDataRef.child('action').push({task:$person.task,name:$person.name,roomid:this.roomID});*/
    this.myDataRef.child(person.key).set({task:person.task,name:person.name});
    this.person=person;
  }

  remove(index)
  {
    console.log(index);
    this.myDataRef.child(this.items[index].key).remove();
    //console.log(this.items);
    //this.items.splice(index, 1);
    //console.log(this.items);
  }
}
