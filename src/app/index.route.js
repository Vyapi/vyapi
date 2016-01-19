export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      //controller: 'MainController',
      controller:'dashboardController',
      controllerAs: 'dashboard'
    });

  $urlRouterProvider.otherwise('/');
}
