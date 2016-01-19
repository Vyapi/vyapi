export class ActionController {
    constructor($firebaseArray) {
        'ngInject';

    var myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');
    myDataRef.set("Himanshu");
    /*
      myDataRef.on('child_added', function(snapshot) {
      var message = snapshot.val();
    console.log(message);
      });*/
}
