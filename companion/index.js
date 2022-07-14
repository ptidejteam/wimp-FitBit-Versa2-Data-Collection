import { peerSocket } from "messaging";
import calendars from "calendars";
import { me } from "companion"

console.log("Companion Running ");

//Server where the API is runnong (must be HTTPS)
// const host = "https://bz1ikefgtf.execute-api.us-east-1.amazonaws.com/api/";
const host = "http://127.0.0.1:5000";
// const host = "https://cat-fact.herokuapp.com/facts"; // GET TEST

function sendMessageToServer(message) {
  fetch(host + "/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  })
    .then(response => {
      console.log("Response from server: " + response.status);
      return response.json();
    })
    .then(data => {
      console.log("Response from server: " + data);
    })
    .catch(error => {
      console.log("Error from server: " + error);
    });
}

// fetch(host, {
//   method : "GET",
//   headers : myHeaders}) // Build the request
// .then(function(response){
//   return response.json();}) //Extract JSON from the response
// .then(function(data) {             
//   console.log("Got response from server:", JSON.stringify(data));}) // Send it to the watch as a JSON string
// .catch(function(error) {
//   console.log(error);}); // Log any errors with Fetch

peerSocket.addEventListener("message", (evt) => {
  console.log("MESSAGE FROM THE APP: " + JSON.stringify(evt.data));
  sendMessageToServer(evt.data);
});

// // The Device application caused the Companion to start
// var myHeaders = new Headers();
// myHeaders.append('Content-Type', 'application/json');

// if (me.launchReasons.peerAppLaunched) {
//   // The Device application caused the Companion to start
//   console.log("Device application was launched!")
// }

// //When the watch sends a message
// messaging.peerSocket.onmessage = evt => {
//   console.log("Data recieved: " + evt.data); //Log it
//   var url = host + "/test"; // add a path to the URL
//   fetch(url, {
//       method : "POST",
//       headers : myHeaders,
//       body: evt.data}) // Build the request
//     .then(function(response){
//       return response.json();}) //Extract JSON from the response
//     .then(function(data) {             
//       console.log("Got response from server:", JSON.stringify(data)); // Log ig
//       messaging.peerSocket.send(JSON.stringify(data)); }) // Send it to the watch as a JSON string
//     .catch(function(error) {
//       console.log(error);}); // Log any errors with Fetch
// }

// CALENDAR EVENTS CODE
// let start = new Date()
// start.setHours(0, 0, 0, 0)
// let end = new Date()
// end.setHours(23, 59, 59, 999)

// let eventsQuery = { startDate: start, endDate: end }

// calendars.searchEvents(eventsQuery).then(function() {
//    todayEvents.forEach(event => {
//      console.log(event.title)
//    })
// });