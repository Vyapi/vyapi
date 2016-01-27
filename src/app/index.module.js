/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { UserController } from './user/user.controller';
import { ActionController } from './action/action.controller';
import { DashboardController } from './dashboard/dashboard.controller.js';
import { Dashboard } from './dashboard/dashboard.service.js';
import { Auth } from './login/login.service';
import { BoardController } from './board/board.controller';
import { RoomController } from './room/room.controller';
import { LoginController } from './login/login.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { FireConnect } from '../app/components/data/connectdb.service';
import { FireData } from '../app/components/data/data.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('vyapi', ['ui.router', 'toastr', 'firebase', 'ngAnimate'])

  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('Dashboard',Dashboard)
  .service('FireConnect',FireConnect)
  .service('FireData',FireData)
  .service('Auth',Auth)
  .controller('MainController', MainController)
  .controller('UserController', UserController)
  .controller('ActionController', ActionController)
  .controller('DashboardController', DashboardController)
  .controller('BoardController', BoardController)
  .controller('RoomController', RoomController)
  .controller('LoginController', LoginController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
