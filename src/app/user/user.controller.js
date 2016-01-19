export class MainController {
  constructor ($timeout, webDevTec, toastr) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1453195760504;
    this.toastr = toastr;

    this.activate($timeout, webDevTec);
  }
}
