export class ActionController {
  constructor($firebaseArray) {
    'ngInject';
    this.person='';
    this.items='';
    this.text='';
    this.roomID='101'; //temporary
    this.assignee=['mayuresh','abhimanyu','aishwarya'];
    this.myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');

    this.items=$firebaseArray(this.myDataRef);
    this.myDataRef.on('child_added',(snapshot)=>{
    //console.log('sdds');
    let actions=snapshot.val();
    this.items = _.map(actions,(action,key)=>{
      action.key=key;
      return action;
    });
    console.table(this.items);
    //console.log(this.items[0].key);
  });

  }

  add()
  {
    this.items.push({task:this.text,name:this.person,roomid:this.roomID});
    //console.log(this.roomID);
    this.myDataRef.child('action').push({task:this.text,name:this.person,roomid:this.roomID});
    //myDataRef.child("users/"+ authData.uid).set(authData);
    this.text = '';
  }

  change($person)
  {
    //console.log($person);
    this.person=$person;
  }

  modify($person)
  {
    console.log('modufiy'+$person);
    /*this.myDataRef.child('action/'+$person.key).remove();
    this.myDataRef.child('action').push({task:$person.task,name:$person.name,roomid:this.roomID});*/
    this.myDataRef.child('action/'+$person.key).set({task:$person.task,name:$person.name,roomid:this.roomID});
    this.person=$person;
  }

  remove($index)
  {
    console.log($index);
    this.myDataRef.child('action/'+this.items[$index].key).remove();
    this.items.splice($index, 1);
    //this.myDataRef.child('action/'+$index)
  }

}
