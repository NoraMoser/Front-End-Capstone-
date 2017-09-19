'use strict';

app.controller("editCtrl", function($scope, $location, $routeParams, trialFactory, $interval, $timeout) {
  
  $scope.task = "";
  $scope.textArea = "";
  $scope.momentTime = "";

  
  

  $scope.saveText = function(){
    $scope.textArea = document.getElementById("symptomTracker").value;
    console.log("$scope.textArea", $scope.textArea);
  };
  


  $scope.scopeEditTime = function(){
    trialFactory.getSingleTime($routeParams.id)
    .then((data) => {
      $scope.task = data;
      console.log("singletime", data);
    });
  }();
  
  $scope.submitTime2 = function(){
    $scope.task.time2 = $scope.timerWithTimeout;
    trialFactory.editTime($scope.task.id, $scope.task)
    .then((data) => {
      //   console.log("data", data);  
    });
  };
  
  $scope.submitTime3 = function(){
    $scope.task.time3 = $scope.timerWithTimeout;
    trialFactory.editTime($scope.task.id, $scope.task)
    .then((data) => {
      // console.log("data for three", data);  
    });
  };

  $scope.saveText = function(){
    $scope.textArea = document.getElementById("symptomTracker").value;
    console.log("$scope.textArea", $scope.textArea);
  };

  $scope.notes = function(){
    // console.log("notes stuff", $scope.textArea.value);
    $scope.task.notes = $scope.textArea;
    console.log(".notes?", $scope.task.notes);
    trialFactory.editTime($scope.task.id, $scope.task)
    .then((data) => {
      console.log("data for notes", data);
      
    });
  };

  $scope.timeStamp = function(){
    $scope.momentTime = moment().format("YYYY MM DD");
    $scope.task.date = $scope.momentTime;
    trialFactory.editTime($scope.task.id, $scope.task)
    .then((data) => {
      console.log("data for moment", data);
    });
  };

  
  
  
  
  $scope.timerWithTimeout = 0;
  $scope.stopped = false;
  
  $scope.startTimerWithTimeout = function() {
    $scope.timerWithTimeout = 0;
    if($scope.myTimeout){
      $timeout.cancel($scope.myTimeout);
    }
    $scope.onTimeout = function(){
      $scope.timerWithTimeout++;
      $scope.myTimeout = $timeout($scope.onTimeout);
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
    let time = $scope.timerWithTimeout;
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    time = hours+':'+minutes+':'+seconds;
    console.log("timer value", time);
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

app.filter('hhmmss', function () {
  return function (time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    time = hours+':'+minutes+':'+seconds;
    return time;
  };

  
   
 });
