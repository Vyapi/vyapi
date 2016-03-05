import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { UserController } from './user/user.controller';
import { ActionController } from './action/action.controller';
import { DashboardController } from './dashboard/dashboard.controller.js';
import { Dashboard } from './dashboard/dashboard.service.js';
import { Auth } from './login/auth.service';
import { BoardController } from './board/board.controller';
import { RoomController } from './room/room.controller';
import { LoginController } from './login/login.controller';
import { FireConnect } from '../app/components/data/connectdb.service';
import { FireData } from '../app/components/data/data.service';
import { GoogleAuth } from '../app/components/data/googleAuth.js';


angular.module('vyapi', ['ui.router', 'toastr', 'firebase', 'ngAnimate','ngCookies','ngCsv', 'ngStorage'])

  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('FireConnect',FireConnect)
  .service('FireData',FireData)
  .service('Dashboard',Dashboard)
  .service('Auth',Auth)
  .controller('MainController', MainController)
  .controller('UserController', UserController)
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController)
  .controller('BoardController', BoardController)
  .controller('RoomController', RoomController)
  .controller('LoginController', LoginController)
  .controller('GoogleAuth', GoogleAuth)
