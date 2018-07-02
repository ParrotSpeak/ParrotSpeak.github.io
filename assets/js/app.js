var app = angular.module('chatApp', ['firebase']);

app.controller('ChatController', function($scope, $firebaseArray) {

	var ref = firebase.database().ref().child("Accounts");
		$scope.check = $firebaseArray(ref);

		$scope.send = function() {
		var ref = firebase.database().ref().child(newChat);
		$scope.check = $firebaseArray(ref);
        $scope.check.$add({
            message: $scope.messageText,
            date: Date.now(),
			user: userName
        })
    }
	
	$scope.initializeChat = function() {
		var ref = firebase.database().ref().child(newChat);
		$scope.check = $firebaseArray(ref);
        $scope.check.$add({
        })
    }
	
	$scope.initializeMessenger = function() {
		var ref = firebase.database().ref().child("Accounts");
		$scope.check = $firebaseArray(ref);
        $scope.check.$add({
        })
    }
	
	$scope.giveUser = function() {
		var ref = firebase.database().ref().child("Accounts");
		$scope.check = $firebaseArray(ref);
        $scope.check.$add({
			user: userName
        })
		ref = firebase.database().ref().child("messages");
		$scope.check = $firebaseArray(ref);
    }

})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    user = firebase.auth().currentUser;

    if(user != null){

	  var ref = firebase.database().ref().child("Accounts");
      var email_id = user.email;
	  userName = email_id;
	  show(0);
	  $("span").show();
    }

  } else {
    // No user is signed in.
    document.getElementById("login_div").style.display = "block";

  }
});

function signup(){

  var email = document.getElementById("create_email_field").value;
  var password = document.getElementById("create_password_field").value;
  userName = document.getElementById("create_email_field").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  
  

}

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  userName = document.getElementById("email_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
  show(4);
  userName = "Anonymous";
  document.getElementById("SliderNav").style.display = "none";
  
}