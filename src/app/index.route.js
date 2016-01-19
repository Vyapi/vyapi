export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    }).state('board', {
      url: '/board',
      templateUrl: 'app/board/board.html',
      controller: 'boardController',
      controllerAs: 'board'
    });

  $urlRouterProvider.otherwise('/');
}
