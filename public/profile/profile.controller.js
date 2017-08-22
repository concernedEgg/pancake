(function () {
  angular.module("testApp").controller("profileCtrl", profileCtrl);

  profileCtrl.$inject = ["$location", "userService"];
  function profileCtrl($location, userService) {
    var vm = this;

    vm.user = {};


    initController();

    function initController() {
      userService
        .getProfile()
        .success(function (data) {
          vm.user = data;
        })
        .error(function (e) {
          console.log(e);
        })

    }
  }
})();
