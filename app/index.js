import { peerSocket } from "messaging";
import { geolocation } from "geolocation";
import { BodyPresenceSensor } from "body-presence";
import { Accelerometer } from "accelerometer";
import { HeartRateSensor } from "heart-rate";
import { me as device } from "device";
import { battery } from "power";
import { charger } from "power";
// import { Sleep } from "sleep";
import { me as appbit } from "appbit";

function sendMessageToCompanion(message) {
  if (peerSocket.readyState === peerSocket.OPEN) {
    console.log("Sending message to companion: " + JSON.stringify(message));
    peerSocket.send(JSON.stringify(message));
  } else {
    console.log("Error while sending message to companion: Connection is not open");
  }
}

// APPLICATION STATUS
console.log("App Started");
while (peerSocket.readyState !== peerSocket.OPEN) 
{}
var appStatus = { status: "started" };
sendMessageToCompanion(appStatus);

// GEOLOCATION SENSOR CODE
// --------------------------------------------------
geolocation.watchPosition(function(position) {
  console.log("RT GEOLOCATION: " + position.coords.latitude + ", " + position.coords.longitude);
  var location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
  sendMessageToCompanion(location);
})

// BODY PRESENCE SENSOR CODE
// --------------------------------------------------
if (BodyPresenceSensor) {
   console.log("This device has a BodyPresenceSensor!");
   const bodyPresence = new BodyPresenceSensor();
   bodyPresence.addEventListener("reading", () => {
     console.log(`RT BODY PRESENCE: The device is ${bodyPresence.present ? '' : 'not'} on the user's body.`);
     var presence = { presence: bodyPresence.present };
      sendMessageToCompanion(presence);
   });
   bodyPresence.start();
} else {
   console.log("This device does NOT have a BodyPresenceSensor!");
}

// ACCELEROMETER SENSOR CODE
// --------------------------------------------------
if (Accelerometer) {
  console.log("This device has an Accelerometer!");
  const accelerometer = new Accelerometer({ frequency: 1 });
  accelerometer.addEventListener("reading", () => {
    console.log(`RT ACCELEROMETER: ${accelerometer.x},${accelerometer.y},${accelerometer.z}`);
    var acceleration = { acceleration: { x: accelerometer.x, y: accelerometer.y, z: accelerometer.z } };
    sendMessageToCompanion(acceleration);
  });
  accelerometer.start();
} else {
  console.log("This device does NOT have an Accelerometer!");
}

// LAST SYNC TIME CODE
// --------------------------------------------------
console.log(`Last synced with companion: ${device.lastSyncTime}`);
var lastSyncTime = { lastSyncTime: device.lastSyncTime };
sendMessageToCompanion(lastSyncTime);

// HEART RATE SENSOR CODE
// --------------------------------------------------
if (HeartRateSensor) {
  console.log("This device has a HeartRateSensor!");
  const heartRateSensor = new HeartRateSensor();
  heartRateSensor.addEventListener("reading", () => {
    console.log(`RT HEART RATE: ${heartRateSensor.heartRate}`);
    var heartRate = { heartRate: heartRateSensor.heartRate };
    sendMessageToCompanion(heartRate);
  });
  heartRateSensor.start();
} else {
  console.log("This device does NOT have a HeartRateSensor!");
}

// BATTERY LEVEL CODE
// --------------------------------------------------
battery.onchange = function() {
  console.log(`Battery level: ${Math.floor(battery.chargeLevel)}%`);
  var batteryLevel = { batteryLevel: Math.floor(battery.chargeLevel) };
  sendMessageToCompanion(batteryLevel);
}

// CHARGE STATUS CODE
// --------------------------------------------------
charger.onchange = function() {
  console.log("The charger " + (charger.connected ? "is" : "is not") + " connected");
  var charge = { charge: charger.connected };
  sendMessageToCompanion(charge);
}

// SLEEP STATUS CODE
// --------------------------------------------------
// if (Sleep) {
//   Sleep.addEventListener("change", () => {
//      console.log(`User sleep state is: ${Sleep.state}`);
//    });
// } else {
//    console.warn("Sleep API not supported on this device, or no permission")
// }

// UNLOAD APPLICATION
// --------------------------------------------------
appbit.onunload = function() {
  console.log("App Unloaded");
  var appStatus = { status: "stopped" };
  sendMessageToCompanion(appStatus);
}


