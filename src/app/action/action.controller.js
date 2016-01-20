export class ActionController {
    constructor($firebaseArray) {
        'ngInject';

      this.items = [ ];
      this.person='';
      this.input='';
      this.roomID='101';
      this.assignee=['mayurehs','abhi','aish'];
      this.myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');
       /* myDataRef.set('');
        myDataRef.push("himanshu");
        myDataRef.push("mayuresh");
        myDataRef.push("abhimanyu");
        myDataRef.push("prakhar");*/
        this.myDataRef.on('child_added',function(snapshot){
        //console.log('sdds');
        var message=snapshot.val();
      });
  }

    add()
    {
      this.items.push(this.input);
      //console.log(this.roomID);
      //this.myDataRef.push(this.input+"  "+(this.person==''?'not assigned to anyone':this.person)+" "+this.roomID);
      //this.myDataRef.child('action').push({task:this.input,name:this.person,roomid:this.roomID});
      //myDataRef.child("users/"+ authData.uid).set(authData);
      this.input = '';
      //this.person='';
    }

    change($person)
    {
      console.log($person);
      this.person=$person;
    }

    remove($index)
    {
      console.log($index);
      this.items.splice($index.$index, 1);
      //this.myDataRef.child('action/'+$index)
    }

  }
