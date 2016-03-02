export function runBlock ($rootScope, $state) {
  'ngInject';
  var rootScope = $rootScope
  rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("home");
    }
    else {
      console.log(error);
    }
  });
}
