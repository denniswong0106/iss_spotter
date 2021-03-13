const printPassTimes = (passTimes) => {
  for (const passtime of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passtime.risetime);
    const duration = passtime.duration;
  
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

module.exports = printPassTimes;