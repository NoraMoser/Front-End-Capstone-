'use strict';


app.controller("graphCtrl", function($scope, $routeParams, trialFactory, userFactory){
    
    var user = userFactory.getCurrentUser();
    
    
    $scope.task = {};
    
    $scope.labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"];
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
    
    trialFactory.getDBValues2()
    .then(times2 => $scope.data.push(times2));

    trialFactory.getDBValues2()
    .then(times3 => $scope.data.push(times3));
    console.log("times arrays on graph ctrl", $scope.data);

    $scope.downloadPDF = () => {
        var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(docDefinition).download('optionalName.pdf');
};

  });
