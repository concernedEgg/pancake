(function () {
  angular.module("testApp", ["ngRoute"]);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "home/home.view.html",
        controller: "homeCtrl",
        controllerAs: "vm"
      })
      .when("/login", {
        templateUrl: "/auth/login/login.view.html",
        controller: "loginCtrl",
        controllerAs: "vm"
      })
      .when("/profile", {
        templateUrl: "/profile/profile.view.html",
        controller: "profileCtrl",
        controllerAs: "vm"
      }) .when("/register", {
        templateUrl: "/auth/register/register.view.html",
        controller: "registerCtrl",
        controllerAs: "vm"
      })
      .when("/logout", {
        resolve: {
          logout: [
            "logoutService",
            function (logoutService) {
              logoutService();
            }
          ]
        },
        redirectTo: "/"
      })
      .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $location, authentication) {
    $rootScope.$on("$routeChangeStart", function (
      event,
      nextRoute,
      currentRoute
    ) {
      if ($location.path() === "/profile" && !authentication.isLoggedIn()) {
        $location.path("/");
      } else if (
        $location.path() === "/login" &&
        authentication.isLoggedIn()
      ) {
        $location.path("/");
      }
    });
  }

  angular
    .module("testApp")
    .config(["$routeProvider", "$locationProvider", config])
    .run(["$rootScope", "$location", "authentication", run]);
})();
