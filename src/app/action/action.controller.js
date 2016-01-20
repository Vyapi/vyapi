export class ActionController {
    constructor($firebaseArray) {
        'ngInject';

      this.person='';
      this.items='';
      this.input='';
      this.roomID='101';
      this.assignee=['mayurehs','abhi','aish'];
      this.myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');

        this.myDataRef.on('child_added',function(snapshot){
        var message=snapshot.val();
        //console.log(message);
      });


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
      this.items.push({task:this.input,name:this.person,roomid:this.roomID});
      //console.log(this.roomID);
      //this.myDataRef.push(this.input+"  "+(this.person==''?'not assigned to anyone':this.person)+" "+this.roomID);
      this.myDataRef.child('action').push({task:this.input,name:this.person,roomid:this.roomID});
      //myDataRef.child("users/"+ authData.uid).set(authData);
      this.input = '';
      this.person='';
    }

    change($person)
    {
      //console.log($person);
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
