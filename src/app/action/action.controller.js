export class ActionController {
    constructor($firebaseArray) {
        'ngInject';

        var myDataRef = new Firebase('https://torrid-fire-8763.firebaseio.com/');
        myDataRef.set({
            name: "name1",
            text: "text1"
        });
    }
}
