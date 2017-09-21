'use strict';

app.controller("exerciseCtrl", function(trialFactory, $location, $scope, $routeParams, $interval, $timeout, userFactory){
    

  $scope.submitButtonText = "Save Data";
  let user = userFactory.getCurrentUser();


  $scope.task = {
      time: "",
      time2: "",
      time3: "",
      notes: "",
      date: "",
      uid: user
  };
// $scope.currentKey = "";
  // var time1 = [];
  // var arrayValues = [];
  $scope.submitTime = function(){
    // trialFactory.getAllTimes();
    // time1 = $scope.timerWithTimeout;
    $scope.task.time = $scope.timerWithTimeout;
     trialFactory.addTime($scope.task)
      .then((data) => {
        $scope.task.id = data.data.name;
        trialFactory.editTime(data.data.name, $scope.task);
          $location.path("/exercises");
      });
    //  $scope.currentKey = $scope.task.time2;
    };

    

    

    
    
    $scope.time = 0;
    $scope.timerWithTimeout = 0;
    $scope.stopped = false;
    
    $scope.startTimerWithTimeout = function() {
      $scope.timerWithTimeout = 0;
      if($scope.myTimeout){
        $timeout.cancel($scope.myTimeout);
      }
      $scope.onTimeout = function(){
        $scope.timerWithTimeout++;
        $scope.myTimeout = $timeout($scope.onTimeout, 1000);
      };
      $scope.myTimeout = $timeout($scope.onTimeout);
    };
    
    $scope.resetTimerWithTimeout = function(){
      $scope.timerWithTimeout = 0;
      $timeout.cancel($scope.myTimeout);
      
    };
    
    $scope.stopTimerWithTimeout = function(){
      $scope.stopped = true;
      $timeout.cancel($scope.myTimeout);
      console.log("myTimeout", $scope.myTimeout.valueOf());
      // console.log($timeout.val);
      $scope.time = $scope.timerWithTimeout;
      var sec_num = parseInt($scope.time); // don't forget the second param
      // var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor(sec_num / 60);
      var seconds = sec_num - (minutes * 60);
      
      // if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      $scope.time = minutes+':'+seconds;
      console.log("timer value", $scope.time);
      console.log("other timer value", $scope.timerWithTimeout);
    };
    // console.log($scope.timerWithTimeout.value);
    
    //timer with interval
    //    $scope.timerWithInterval = 0;
    $scope.startTimerWithInterval = function() {
      $scope.timerWithInterval = 0;
      if($scope.myInterval){
        $interval.cancel($scope.myInterval);
      }
      $scope.onInterval = function(){
        $scope.timerWithInterval++;
      };
      $scope.myInterval = $interval($scope.onInterval,1000);
    };
    
    $scope.resetTimerWithInterval = function(){
      $scope.timerWithInterval = 0;
      $interval.cancel($scope.myInterval);
    };
  });
  
  app.filter('mmss', function () {
    return function (time) {
      var sec_num = parseInt(time, 10); // don't forget the second param
      // var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor(sec_num / 60);
      var seconds = sec_num - (minutes * 60);
      
      // if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 1) {minutes = "0"+minutes;}
      if (seconds < 1) {seconds = "0"+seconds;}
      time = minutes+':'+seconds;
      return time;
    };
});