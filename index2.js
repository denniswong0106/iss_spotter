const printPassTimes = require('../printPassTimes');
const{ nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((ISSData) => {
//     const passTimes = JSON.parse(ISSData).response;
//     for (const passtime of passTimes) {
//       const datetime = new Date(0);
//       datetime.setUTCSeconds(passtime.risetime);
//       const duration = passtime.duration;

//       console.log(`Next pass at ${datetime} for ${duration} seconds!`);
//     };
// });

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Didn't work!", error.message);
})



