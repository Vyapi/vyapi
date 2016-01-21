export function routerConfig ($stateProvider, $urlRouterProvider) {
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
    controllerAs: 'dashboard'
  })
  .state('board', {
    url: '/board',
    templateUrl: 'app/board/board.html',
    controller: 'BoardController',
    controllerAs: 'board'
  })
  .state('room', {
    url: '/room',
   // templateUrl: 'app/room/room.html',
    //controller:'RoomController',
    //controllerAs: 'room',
    views: {

        // the main template will be placed here (relatively named)
        '': { templateUrl: 'app/room/room.html' },
        // the child views will be defined here (absolutely named)
        'board@room': { templateUrl: 'app/board/board.html',
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
      }

    })
/*.state('room.board', {
    url: '/board',
    templateUrl: 'app/board/board.html',
    controller: 'BoardController',
    controllerAs: 'board'
  })*/
;
$urlRouterProvider.otherwise('/');
}
