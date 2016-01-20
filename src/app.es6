var app = angular.module("vyapi",["firebase"]);
app.controller("sample",[$firebaseObject,function(){
		var ref = new Firebase("https://vyapi.firebaseio.com/");
		this.val = $firebaseObject(ref);
		console.log(this.val);
		}]);

