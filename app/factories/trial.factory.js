"use strict";

app.factory("trialFactory", function($q, $http, FBCreds, userFactory){

    let firstSaveTime = "";

    const getAllTimes = function(user){
        let times = [];
        // console.log("url is", `${FBCreds.databaseURL}/graph.json`);
        return $q( (resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/graph.json?`)
            .then((itemObject) => {
                let itemCollection = itemObject.data;
                console.log("itemCollection", itemCollection);
                Object.keys(itemCollection).forEach((key) => {
                    itemCollection[key].id = key;
                    times.push(itemCollection[key]);
                    console.log("array of times:", times);
                });
                resolve(times);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const addTime = function(obj){
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/graph.json`, newObj)
        .then((data) => {
            console.log("data from trial factory post", data);
            firstSaveTime = data.data.name;
            console.log("first", firstSaveTime);
            return data; //this is the key!
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };
    //let currentKey = empty at first then set with first save
    const editTime = function(time, obj){
        console.log("obj and id", time, obj);
        return $q((resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.patch(`${FBCreds.databaseURL}/graph/${time}.json`, newObj) 
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });           
        });
    };

    const getSingleTime = function(itemId){
        return $q((resolve, reject) =>{
            $http.get(`${FBCreds.databaseURL}/graph/${itemId}.json`)
            .then((itemObj) => {
                resolve(itemObj.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

    //do a patch for save 2 and 3

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

    const getTimes2 = function(obj){
        return Object.keys(obj).map(key => obj[key].time2);   
        //return a new array with just times   
     };
     
     const getDBValues2 = function(){
         return $q (( resolve, reject) => {
             $http.get(`${FBCreds.databaseURL}/graph.json`)
             .then(graph => resolve(getTimes2(graph.data)));
         });
     };

     const getTimes3 = function(obj){
        return Object.keys(obj).map(key => obj[key].time3);   
        //return a new array with just times   
     };
     
     const getDBValues3 = function(){
         return $q (( resolve, reject) => {
             $http.get(`${FBCreds.databaseURL}/graph.json`)
             .then(graph => resolve(getTimes3(graph.data)));
         });
     };
     
    
    return { addTime, getDBValues, getDBValues2, editTime, getAllTimes, getSingleTime, getDBValues3, getTimes3};
});