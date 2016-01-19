export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('action', {
      url: '/action',
      templateUrl: 'app/action/action.html',
      controller: 'ActionController',
      controllerAs: 'action'
    });

  $urlRouterProvider.otherwise('/');
}
