(function () {
  angular.module("testApp").service("authentication", authentication);

  authentication.$inject = ["$http", "$window", "$location"];
  function authentication($http, $window, $location) {
    var saveToken = function (token) {
      $window.localStorage["mean-token"] = token;
    };

    var getToken = function () {
      return $window.localStorage["mean-token"];
    };

    var isLoggedIn = function () {
      var token = getToken();
      var payload;

      if (token) {
        payload = token.split(".")[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function () {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = token.split(".")[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email: payload.email,
          name: payload.name,
          usertype: payload.usertype,
          faculty: payload.faculty,
          mat: payload.mat,
          city: payload.city,
          street: payload.street,
          postalCode: payload.postalCode,
          tel: payload.tel
        };
      }
    };
    //login
    login = function (user) {
      return $http.post("/api/login", user).success(function (data) {
        saveToken(data.token);
      });
    };

       //registra un utente
    register = function(user) {
           return $http.post("/api/register", user);
    };

    return {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      login: login,
      register: register
    };
  }
})();
