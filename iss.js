const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      const lat = JSON.parse(body).latitude;
      const long = JSON.parse(body).longitude;
      callback(null, {lat, long});
    }
  });
};

const fetchISSFlyOverTimes = (coord, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coord.lat}&lon=${coord.long}`, (error, response, body) => {
    if (error) {
      callback (error, null);
      return;

    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      risetimes = JSON.parse(body).response;
      callback (null, risetimes);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;

    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          callback(error, null);
          return;

        } else {
          fetchISSFlyOverTimes(coords, (error, passTimes) => {
            if (error) {
              callback(error, null);
              return;

            } else {
              callback(null, passTimes);
              return;
            }
          })
        }
      })
    }
  })
}



module.exports = { nextISSTimesForMyLocation };