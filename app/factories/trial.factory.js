"use strict";

app.factory("trialFactory", function($q, $http, FBCreds){

    var arrayValues = [];
    

    const addTime = function(obj){
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/graph.json`, newObj);
        
    };
    const setValues = function(value){
        arrayValues = value;
        console.log("factory array:", arrayValues);
    };

    const getValues = function(value){
        return arrayValues;
    };
    // const getValues = function(){
    //     return values;
    // };
    // Get and Set
    return {setValues, addTime, getValues};
});