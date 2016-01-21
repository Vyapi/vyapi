export function routerConfig ($stateProvider, $urlRouterProvider,$locationProvider) {
  'ngInject';
  $stateProvider
  .state('user', {
    url: '/user',
    templateUrl: 'app/user/user.html',
    controller: 'UserController',
    controllerAs: 'users'
  })
  .state('home',{
    url:'/',
    templateUrl: 'app/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .state('action', {
    url: '/action',
    templateUrl: 'app/action/action.html',
    controller: 'ActionController',
    controllerAs: 'action'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller:'DashboardController',
    controllerAs: 'dashboard',
    resolve: {
      auth: function($q,$firebaseAuth,$window){
        var deferred = $q.defer();
        var ref = new Firebase("https://vyapi.firebaseio.com");
        var authObj = $firebaseAuth(ref);
        var authData = authObj.$getAuth();
        if (authData) {
          deferred.resolve();
        } else {
          $window.location.href='/'
          deferred.reject('You are not allowed on this page');
        }
        return deferred.promise;
      }

    }
  })
  .state('board', {
    url: '/board',
    templateUrl: 'app/board/board.html',
    controller: 'BoardController',
    controllerAs: 'board'
  });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
