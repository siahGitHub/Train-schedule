// Initialize Firebase
    // This is the code we copied and pasted from our app page
console.log(moment().fromNow());
    var config = {
      apiKey: "AIzaSyBL1snLeJjsdwLMuQbRja-ISwyljf2Amtg",
      authDomain: "siah-firebase-project.firebaseapp.com",
      databaseURL: "https://siah-firebase-project.firebaseio.com",
      projectId: "siah-firebase-project",
      storageBucket: "siah-firebase-project.appspot.com",
      messagingSenderId: "122949426588"
    };
  firebase.initializeApp(config);

// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// Assign the reference to the database to a variable named 'database'
// var database = ...


// Initial Values
var trainName="";
var destination ="";
var frequency = "";
var firstArrival = 0;
var train={};

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref('trains/').on("child_added", function(childSnapshot) {

console.log(childSnapshot.val());
addTableRow(childSnapshot.val());
// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------
function addTableRow(train){
var row = $("<tr>").html("<td>"+train.name+"</td>"+"<td>"+train.destination+"</td>"+"<td>"+train.frequency+"</td>"+"<td>" + moment(train.firstArrival).add(train.frequency,"m").format("HH:mm:ss") + "</td>");
//$("#employee-table").append(row);
$('tbody').append(row);
}

// Whenever a user clicks the submit-bid button
$("#add-train").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  trainName = $("#name-input").val();
  destination = $("#destination-input").val();
  frequency = $("#frequency-input").val();
  firstArrival = $("#firstarrival-input").val();
  //moment(firstArrival).add(frequency,'m').format("HH:mm:ss")
  //nextArrival = moment()
  
  train = {
    name : trainName,
    destination : destination,
    frequency : frequency,
    firstArrival : firstArrival,
    dateAdded : firebase.database.ServerValue.TIMESTAMP
  };
  //console.log(train);
  database.ref('trains/').push(train);
});

function calculateTime(){
  var now = moment().format("HH:mm:ss");
   console.log(now);
};

calculateTime();