"use strict";

app.controller("initialCtrl", function($scope, $routeParams, $window, $location, userFactory){

    $scope.account = {
        email: "",
        password: ""
      };
      
    let logout = () => {
        console.log("logout clicked");
        userFactory.logOut()
          .then(function () {
            console.log("logged out DONE");
            //no need to redirect since isAuth verifies login and will take care of re-direction
            // $location.href = "#!/";
          }, function (error) {
            console.log("error occured on logout");
          });
        };
  
          $scope.loginGoogle = () => {
            console.log("you clicked on google login");
    
            userFactory.authWithProvider()
            .then( (result) =>{
                let user = result.user.uid;
                $location.path("/task-list");
                $scope.apply();
            }).catch( (error) => {
                console.log("error with google login");
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });
        };
    

});