"use strict";

app.factory("trialFactory", function($q, $http, FBCreds, userFactory){

    

    const addTime = function(obj){
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/graph.json`, newObj);
        
    };

    var user = userFactory.getCurrentUser();

    const getTimes = function(obj){
       return Object.keys(obj).map(key => obj[key].time);   
       //return a new array with just times   
    };
    
    const getDBValues = function(){
        return $q (( resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/graph.json`)
            .then(graph => resolve(getTimes(graph.data)));
        });
    };
    
    return { addTime, getDBValues};
});