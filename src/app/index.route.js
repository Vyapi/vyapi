export function routerConfig ($stateProvider, $urlRouterProvider,$locationProvider) {
  'ngInject';
  $stateProvider
  .state('home',{
    url:'/',
    templateUrl: 'app/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller:'DashboardController',
    controllerAs: 'dashboard',
    resolve: {
      auth: function($firebaseAuth, FireConnect) {
        return FireConnect.getUserAuthObj().$requireAuth();
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
      auth: function($firebaseAuth, FireConnect) {
        return FireConnect.getUserAuthObj().$requireAuth();
      }
    }
  });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
