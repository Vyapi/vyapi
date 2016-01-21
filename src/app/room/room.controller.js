export class RoomController {
  constructor ($firebaseAuth, $stateParams) {
    'ngInject';

    console.info(`in room controller in room ${$stateParams.roomKey }`);

  }

}
