export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    }).state('board', {
      url: '/board',
      templateUrl: 'app/board/board.html',
      controller: 'BoardController',
      controllerAs: 'board'
    });

  $urlRouterProvider.otherwise('/');
}
