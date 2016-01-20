export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });

  $urlRouterProvider.otherwise('/');
}
