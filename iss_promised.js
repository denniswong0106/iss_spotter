const request = require('request-promise-native');

const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = (ip) => {
  return request(`https://freegeoip.app/json/${JSON.parse(ip).ip}`);
};

const fetchISSFlyOverTimes = (coord) => {
  const lat = JSON.parse(coord).latitude;
  const long = JSON.parse(coord).longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((dataISS) => {
    const { response } = JSON.parse(dataISS);
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };