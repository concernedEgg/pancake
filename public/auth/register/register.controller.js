(function () {
  angular.module("testApp").controller("registerCtrl", registerCtrl);

  registerCtrl.$inject = ["$location", "authentication", "$window"];
  function registerCtrl($location, authentication, $window) {
    var vm = this;

    vm.userData = {
      name: "",
      email: "",
      password: ""
    };

    vm.onSubmit = function () {
      console.log(vm.userData);
      authentication.register(vm.userData).error(function (err) {
        alert("err");
      });
    };
  }
})();
