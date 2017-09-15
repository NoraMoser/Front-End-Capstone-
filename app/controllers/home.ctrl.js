'use strict';

app.controller("homeCtrl", function($scope, $routeParams, userFactory, $window){
    
    $scope.isLoggedIn = false;
    $scope.logout = () => {
        userFactory.logOut();
      };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      console.log("currentUser logged in?", user);
      console.log("logged in t-f", $scope.isLoggedIn );
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      console.log("user logged in?", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });
  $scope.userDeets = [];
  let getThoseDeets = function(){
       let pulledInfo = userFactory.getUserDeets();
       $scope.userDeets = pulledInfo.splice(0,1);
       console.log("pulled info", pulledInfo);
       console.log("user deets", $scope.userDeets);
  }();

    });