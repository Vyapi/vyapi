export class ActionController {
    constructor($firebaseArray) {
        'ngInject';

      this.items = [ ];
        var myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');
        /*myDataRef.push("himanshu");
        myDataRef.push("mayuresh");
        myDataRef.push("abhimanyu");
        myDataRef.push("prakhar");*/
        myDataRef.on('child_added',function(snapshot){
        //console.log('sdds');
        var message=snapshot.val();
        //console.log(message);
      });
}

    add($input)
    {
      this.items.push($input);
      $input='';//not happenning.

    }

    remove($input)
    {
      this.items.splice($input, 1);
    }

  }
