
$(document).ready(function() {

var firebaseConfig = {
    apiKey: "AIzaSyAXGPONq6FyWacRDkZjjtB1Yc25qLPD66U",
    authDomain: "kucodingbootcampproject.firebaseapp.com",
    databaseURL: "https://kucodingbootcampproject.firebaseio.com",
    projectId: "kucodingbootcampproject",
    storageBucket: "kucodingbootcampproject.appspot.com",
    messagingSenderId: "657897670035",
    appId: "1:657897670035:web:50eed2f5ae10b0bf4a1466"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var userInput;
  $("#submitButton").on("click", function(event) {
      event.preventDefault();
        var trainName = $("#train-name").val().trim();
    console.log(trainName.match(/[a-z]/i));
        var destination = $("#fin")

  })

})