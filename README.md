# Fitbit Versa 2 Real Time Data Collector
<p align="center" style="margin: 50px 0">
    <img src="assets/fitbit_logo.jpg" alt="WIMP Frontend Logo" style="height:120px; width:auto;"/>
<p>

## Description
Fitbit Versa 2 small application based on fitbit-sdk (4.0.0) to collect real time data from the sensors of the watch.

## Installation
To install the project, run the following commands : 
```bash
npm install
npm run build
npx fitbit
bi
```

## How it works ?
<p align="center" style="margin: 50px 0">
    <img src="assets/Fitbit_Architecture.png" alt="WIMP Frontend Logo"/>
<p>

- The device (Fitbit Versa 2 Watch) collects data from its sensors and sends it to the companion through WebSocket.
- The companion (Mobile phone) receives the data and send it to an API endpoint through an HTTP POST request.

## Sources
- The ```app`` directory contains the sources corresponding to the application that will be deployed on the watch.
- The ```companion``` directory contains the sources corresponding to the application that will be deployed on the mobile phone (through the fitbit app).

## References
- [Fitbit SDK Website](https://dev.fitbit.com/)
- [Fitbit Device API](https://dev.fitbit.com/build/reference/device-api/)
- [Fitbit Companion API](https://dev.fitbit.com/build/reference/companion-api/)