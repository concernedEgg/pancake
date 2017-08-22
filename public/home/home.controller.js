(function() {
  angular.module("testApp").controller("homeCtrl", homeCtrl);

  homeCtrl.$inject = ["$location", "userService"];
  function homeCtrl($location, userService) {
    var vm = this;

    vm.user = {};

    userService
      .getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function(e) {
        console.log(e);
      });
  }
})();
