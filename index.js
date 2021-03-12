const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  } else {

    for (const passtime of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(passtime.risetime);
      const duration = passtime.duration;

      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  }
})
