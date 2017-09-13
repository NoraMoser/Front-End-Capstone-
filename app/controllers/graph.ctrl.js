'use strict';


app.controller("graphCtrl", function($scope, $routeParams, trialFactory){

    var array = trialFactory.getValues();
    
    
    $scope.task = {
        time: "",
        date: ""
    };
    
    

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      array
    //   [28, 48, 40, 19, 86, 27, 90],
    //   [34, 56, 75, 57, 89, 78, 65]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    const overallGraph = function(){

    };

    
  });
