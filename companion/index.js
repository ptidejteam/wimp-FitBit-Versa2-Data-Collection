import { peerSocket } from "messaging";
import calendars from "calendars";

console.log("Companion Running ");

// GET TEST FROM COMPANION CODE
// --------------------------------------------------
// const host = "https://cat-fact.herokuapp.com/facts";
// fetch(host, {
//   method : "GET",
//   headers : myHeaders}) // Build the request
// .then(function(response){
//   return response.json();}) //Extract JSON from the response
// .then(function(data) {             
//   console.log("Got response from server:", JSON.stringify(data));}) // Send it to the watch as a JSON string
// .catch(function(error) {
//   console.log(error);}); // Log any errors with Fetch

// const host = "https://webhook.site/afbb96d5-cfba-41ed-a4c9-0d0325e278c3"; // Webhook URL fort tests

const host = "http://192.168.0.203/data"

function sendMessageToServer(message) {
  fetch(host , {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: message
  })
    .then(response => {
      console.log("Response from server: " + response.status);
      return response.json();
    })
    .then(data => {
      console.log("Response from server: " + JSON.stringify(data));
    })
    .catch(error => {
      console.log("Error from server: " + error);
    });
}

// CALENDAR EVENTS CODE
let start = new Date()
start.setHours(0, 0, 0, 0)
let end = new Date()
end.setHours(23, 59, 59, 999)

let eventsQuery = { startDate: start, endDate: end }

calendars.searchEvents(eventsQuery).then(todayEvents => {
  console.log("CALENDAR EVENTS: ");
  todayEvents.forEach(event => {
    console.log("EVENT : " + event.title)
    sendMessageToServer(event);
  })
});


peerSocket.addEventListener("message", (evt) => {
  console.log("MESSAGE FROM THE APP: " + evt.data);
  sendMessageToServer(evt.data);
});
