export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      //controller: 'MainController',
      controller:'DashboardController',
      controllerAs: 'dashboard'
    });

  $urlRouterProvider.otherwise('/');
}
