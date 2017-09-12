"use strict";

app.factory("trialFactory", function($q, $http, FBCreds){

    const addTime = function(obj){
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/graph.json`, newObj);
        // .then( (data) => {
        //     return data;
        // }, (error) => {
        //     let errorCode = error.code;
        //     let errorMessage = error.message;
        //     console.log("error", errorCode, errorMessage);
        // });
    };

    return {addTime};
});