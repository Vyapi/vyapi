export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    /*.state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })*/
    .state('home', {
      url: '/',
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'user'
    });

  $urlRouterProvider.otherwise('/');
}
