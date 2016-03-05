export class Email {
  constructor($http, $location) {
    'ngInject';
    this.sendInvite = function(params) {
      $http({
        method: 'GET',
        url: $location.protocol() + '://'+ $location.host() +':'+  $location.port() + '/emailWrite',
        params: params
      })
      .then(function success(response) {
        console.log(response);
      }, function failure(response) {
        console.log(response);
      });
    }
  }
}