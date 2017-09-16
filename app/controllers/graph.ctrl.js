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
    
   let num1 = trialFactory.getDBValues()
    .then(times => $scope.data.push(times));
    
    trialFactory.getDBValues2()
    .then(times2 => $scope.data.push(times2));

    trialFactory.getDBValues3()
    .then(times3 => $scope.data.push(times3));
    console.log("times arrays on graph ctrl", $scope.data);

    $scope.downloadPDF = () => {
        var docDefinition = {
            content: [
            { text: 'Exercises in hundredths of a second', bold: true, fontSize: 25 },
                
              {
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,
                  widths: [ 55, 55, 55, 55, 55, 55, 55 ],
          
                  body: $scope.data
                }
            },
            { text: '* Row 1 is excersize 1, row 2 is exercise 2, and row 3 is exercise 3 *', fontSize: 15 }
        ]
    };
    
    
    
    
    pdfMake.createPdf(docDefinition).download('remotetrial.pdf');
};
            

  });
