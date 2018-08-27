const service = require ('./functions/service');
const route = require ('./functions/route');
const trip = require ('./functions/trip');

module.exports = {
  service : {
    vehicles : service.updateVehicle,
  },
  route : {
    duration : route.updateDuration
  },
  trip : {
    departTime : trip.updateDepartTime
  }
}
