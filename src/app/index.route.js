export function routerConfig ($stateProvider, $urlRouterProvider,$locationProvider) {
  'ngInject';
  $stateProvider
  .state('email', {
    url: '/email',
    controller: 'Email',
    controllerAs: 'Email'
  })
  .state('auth',{
    url: '/googleAuth',
    controller: 'GoogleAuth',
    controllerAs: 'GoogleAuth'
  })
  .state('home',{
    url:'/',
    templateUrl: 'app/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login',
    resolve: {
      auth: function($localStorage, $q, $location) {
        if($localStorage.auth != undefined && $localStorage.userInfo != undefined ) { //already authenticated
          //todo: verify the auth and then redirect to dashboard
          $location.path('/dashboard');
        }
        return $q.resolve();
      }
    }
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller:'DashboardController',
    controllerAs: 'dashboard',
    resolve: {
      auth: function($localStorage, $q, $cookies, $location) {
        if($localStorage.auth == undefined || $localStorage.userInfo == undefined ) {
          $cookies.put('path', $location.path());
          return $q.reject('AUTH_REQUIRED');
        }
        else if($cookies.get('path')) {
          console.log('going to cookie path');
          let path = $cookies.get('path');
          $cookies.remove('path');
          $location.path(path);
        }
        return $q.resolve();
      }
    }
  })
  .state('room', {
    url: '/room/:roomKey',
    views: {

      '': {
        templateUrl: 'app/room/room.html',
        controller:'RoomController',
        controllerAs: 'room'
      },
      // the child views will be defined here (absolutely named)
      'board@room': {
        templateUrl: 'app/board/board.html',
        controller: 'BoardController',
        controllerAs: 'board'
      },

      //user room view
      'user@room': {
        templateUrl: 'app/user/user.html',
        controller: 'UserController',
        controllerAs: 'users'
      },

      //action room view
      'action@room':{
        templateUrl: 'app/action/action.html',
        controller: 'ActionController',
        controllerAs: 'action'
      }
    },
    resolve: {
      auth: function($localStorage, $q, $cookies, $location) {
        if($localStorage.auth == undefined || $localStorage.userInfo == undefined ) {
          $cookies.put('path', $location.path());
          return $q.reject('AUTH_REQUIRED');
        }
        else if($cookies.get('path')) {
          console.log('going to cookie path');
          let path = $cookies.get('path');
          $cookies.remove('path');
          $location.path(path);
        }
        return $q.resolve();
      }
    }
  });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
