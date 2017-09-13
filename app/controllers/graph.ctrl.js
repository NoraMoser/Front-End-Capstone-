'use strict';


app.controller("graphCtrl", function($scope, $routeParams, trialFactory, userFactory){
    
    var user = userFactory.getCurrentUser();
    
    
    $scope.task = {
        time: "",
        date: "",
        uid: user
    };
    
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [];
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
    
    trialFactory.getDBValues()
    .then(times => $scope.data.push(times));
    

    
  });
