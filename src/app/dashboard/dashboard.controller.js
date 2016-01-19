export class DashboardController {
  constructor ($firebaseObject) {
    'ngInject';
		var rootRef = new Firebase('https://vyapi.firebaseio.com/');
		this.data = $firebaseObject(rootRef);
		console.log(this.data);
  }
}
