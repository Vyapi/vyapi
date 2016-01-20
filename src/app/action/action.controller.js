export class ActionController {
    constructor($firebaseArray) {
        'ngInject';

      this.items = [ ];
      this.person='';
      this.input='';
      this.assignee=['mayuresh','abhi','aish'];
      this.myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');
       /* myDataRef.set('');
        myDataRef.push("himanshu");
        myDataRef.push("mayuresh");
        myDataRef.push("abhimanyu");
        myDataRef.push("prakhar");*/
        this.myDataRef.on('child_added',function(snapshot){
        //console.log('sdds');
        var message=snapshot.val();
        //console.log(message);
      });
  }

    add()
    {
      this.items.push(this.input+"  "+this.person);

      this.input = '';
      //console.log(person);
      //this.myDataRef.push(this.items);
    }

    change($person){

      console.log($person);
    }

    change($person)
    {
      console.log($person);
      this.person=$person;
    }

    remove($input)
    {
      this.items.splice($input, 1);
    }

  }
