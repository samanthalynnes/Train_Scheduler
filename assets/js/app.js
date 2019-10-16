
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

  // On click function for submit button to take in data
  $("#submitButton").on("click", function(event) {
      event.preventDefault();

      // Grabs user input
        var trainName = $("#train-name").val().trim();
        var destination = $("#final-stop").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#train-frequency").val().trim();

        // Creates local "temporary" oject for holding data
        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
        };

        // Uploads new data to the database
        database.ref().push(newTrain);

        // Log everything to the console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.frequency);

        // Clears all of the text boxes
        $("input").val("");
});
    // Creates firebase event for addding data to the database
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

    // Store everything into a new variable
    var newTrainName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTrainTime;
    var newFrequency = childSnapshot.val().frequency;

    // New train info
    console.log(newTrainName);
    console.log(newDestination);
    console.log(firstTime);
    console.log(newFrequency);

    // Make sure the first train time is after the eventual current time
    var TrainTimeConv = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(TrainTimeConv);
    // Store variable for current time
    var currentTime = moment().format("HH:mm");
    console.log("Current Time:" + currentTime);
    // Variable to diff of current time and first train time
    var TrainTimeDiff = moment().diff(moment(TrainTimeConv), "minutes");
    console.log("Train Time Difference:" + TrainTimeDiff);
    // Variable for the time left
    var timeLeft = TrainTimeDiff % newFrequency;
    console.log("Time Left:" + timeLeft);
    //Calculate the minutes away the next train will be
    var minutesAway = newFrequency - timeLeft;
    console.log("Minutes Away:" + minutesAway);
    // Calculate the next arriving train
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log("Next Arrival:" + nextArrival);

    // Create the new row
    var newRow = $("<tr>").append(
        ($("<td>").text(newTrainName)),
        ($("<td>").text(newDestination)),
        ($("<td>").text(newFrequency)),
        ($("<td>").text(nextArrival)),
        ($("<td>").text(minutesAway))
        );

    // Append the new row to the table
    $("#table-body > tbody").append(newRow);
       
  });

});