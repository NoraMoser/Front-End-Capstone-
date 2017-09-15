"use strict";

app.factory("userFactory", function($q, $http){

    let currentUser = null;
    let AddNewUserObj = [];
    

    const isAuthenticated = function (){
        console.log("userFactory: isAuthenticated");
        console.log("add new user object", AddNewUserObj);
        return new Promise ( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if (user){
                    currentUser = user.uid;
                    AddNewUserObj.push({
                        userName: user.displayName,
                        userEmail: user.email,
                        userPhoto: user.photoURL
                    });
                    resolve(true);
                }else {
                    resolve(false);
                }
            });
        });
    };

    const getCurrentUser = function(){
        return currentUser;
    };

    const getUserDeets = function(){
        return AddNewUserObj;
    };

    const logOut = function(){
        console.log("logoutUser");
        return firebase.auth().signOut();
    };

    let provider = new firebase.auth.GoogleAuthProvider();
    
    let authWithProvider = function(){
        return firebase.auth().signInWithPopup(provider);
    };

    return {getCurrentUser, logOut, isAuthenticated, authWithProvider, getUserDeets};
    

});