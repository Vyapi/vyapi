export class GoogleAuth{
  constructor($location, $localStorage, $http, $window){
    'ngInject';

    var params = $location.hash().split('&');
    var result = {};
    for(var i = 0; i<params.length; ++i) {
      var temp = params[i].split('=');
      result[temp[0]] = temp[1];
    }

    this.verify = function() {
      return new Promise((resolve, reject) => {
        $http({
          method: 'GET',
          url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
          params: {'access_token': result['access_token']}
        }).then(function successCallback(response) {
            if(response.status != 200) {
              $window.alert('Token invalid.\nRelogin');
              reject();
            }
            else if(response.exp < Date.now()) {
              $window.alert('auth expired.\nRelogin');
              reject();
            }
            else if(response.data.aud !== "662183359983-j65e9u3vetanp8n779oqohvkc55a1s4h.apps.googleusercontent.com") { //avoid confused deputy problem 
              console.log("resolve.aud did not match cliendID");
              console.log(response);
              reject();
            }
            $localStorage.auth = result;
            resolve(response);
          }, function errorCallback(response) {
            reject(response);
          });
      });
    }

    this.getUserInfo = function() {
      return new Promise((resolve, reject) => {
        $http({
          method: 'GET',
          url: 'https://www.googleapis.com/oauth2/v2/userinfo',
          params: {'access_token': result['access_token']}
        }).then(function successCallback(response) {
            var appURL = "https://vyapi.firebaseio.com/";
            $localStorage.userInfo = response.data;
            $localStorage.userInfo['id'] = "google:" + $localStorage.userInfo['id'];
            (new Firebase(appURL + "users/" + $localStorage.userInfo['id'])).set(response.data);
            resolve(response);
          }, function errorCallback(response) {
            reject(resolve);
          });
      });
    }

    this.verify()
      .then(this.getUserInfo())
      .then(function(){ console.log('redirecting to dashboard after successfull login'); $location.path('./dashboard');})
      .catch(error => {
        if(error != null)
          console.log(error);
        console.log('cannot redirect to dashboard. rot here');
      });

  } //end of constructor
}