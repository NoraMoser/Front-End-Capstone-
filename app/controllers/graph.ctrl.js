'use strict';


app.controller("graphCtrl", function($scope, $routeParams, trialFactory, userFactory){
    
    var user = userFactory.getCurrentUser();
    
    
    var ugh = [1, 2, 3, 4, 5];
    var current = [];
    console.log("current check", current);
    $scope.task = {};
    
    // $scope.labels = current;
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [];
    Chart.defaults.global.colors = [ '#fa97ff', '#01c3fe', '#56ca4a'  ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, {xAxisID: 'x-axis-1'}] ;
    
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                }
               
            ],
            xAxes: [
            {
                id: 'x-axis-1',
                display: true,
                position: 'bottom'
            }
            ]
        }
    };
    
   trialFactory.getDBValues()
    .then(times => $scope.data.push(times));
    
    trialFactory.getDBValues2()
    .then(times2 => $scope.data.push(times2));

    trialFactory.getDBValues3()
    .then(times3 => $scope.data.push(times3));
    console.log("times arrays on graph ctrl", $scope.data);

    $scope.notes = [];
    trialFactory.getDBNotes()
    .then(notes => $scope.notes.push(notes));
    console.log("scope.notes", $scope.notes);

    trialFactory.getDBCurrentTime()
    .then(date => {
        console.log("current times", date);
        $scope.labels = date;
        
    });
    console.log("scope.current", current);

    $scope.downloadPDF = () => {
        var docDefinition = {
            content: [
            { text: 'Exercise times by second', bold: true, fontSize: 25 },
                
              {
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,
                  widths: [ 25, 25, 25, 25, 25, 25, 25, 25, 25, 25 ],
          
                  body: $scope.data
                }
            },
            { text: '* Row 1 is exercise 1, row 2 is exercise 2, and row 3 is exercise 3 *', fontSize: 15 },
            
            { text: 'Notes Section', bold: true, fontSize: 25},

            
                  $scope.notes
                
            
            
        ]
    };
    
    
    
    
    pdfMake.createPdf(docDefinition).download('remotetrial.pdf');
};
            

  });
