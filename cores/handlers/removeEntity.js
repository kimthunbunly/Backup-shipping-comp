const entity = require ('../../globle/models');
const tripFunctions = require('./functions/trip');

module.exports = {
  company : async function (company) {
    const services = await entity['service'].find({company});
    services.forEach(async (service) => {
      service.remove((err, result) => {
        console.log({'SERVICE => remove id' : result._id });
      });
      entity['route'].update({},{$pull : {services : service._id}}, (err, result) => {
        if(err) console.error(err);
        console.log({'ROUTE => pull service': result});
      });
      const trips = await entity['trip'].find({service : service._id});
      trips.forEach(async (trip) => {
        const doc = await trip.remove(); // trigger post remove
        console.log(doc);
      })
    })
  },
  vehicle : async function (vehicle) {
    const update = {
       $pull : { vehicles : vehicle._id },
       $inc : {
         "maxVolume" : -vehicle['volume'],
         "maxWeight" : -vehicle['volume'] * 1000
       }
     }
     const updateTrip = {
       $inc : {
         "availableVolume" : -vehicle['volume'] ,
         "availableWeight" : -vehicle['volume'] * 1000,
         "maxVolume" : -vehicle['volume'],
         "maxWeight" : -vehicle['volume'] * 1000
       }
     }
     const services = await entity ['service'].find({vehicles : vehicle._id});
     services.forEach(service => {
       entity['trip'].update({service: service._id}, updateTrip, (err, result) => {
         if (err)  console.error(err);
         console.log({"TRIP => update space": result});
       })
     })
     entity['service'].updateMany ({ vehicles : vehicle._id }, update, (err, result) => {
       if (err) console.error(err);
       console.log({"SERVICE => decrease space" : result});
     })
  },
  trip : async function (trip) {
    tripFunctions.removeTrip(trip);
  },
  route : function (route) {
    entity['trip'].find ({route : route._id}, (err, trips) => {
      if(err) console.error(err);
      trips.forEach(trip => {
        trip.remove((err, result) => { // trigger post remove
          if (err) console.log(err);
          console.log({"TRIP => delete": result._id});
        })
      })
    })
    entity ['service'].updateMany ({}, {$pull : { routes : route._id }}, (err, result) => {
      if (err) console.error(err);
      console.log({"SERVICE => pull route id" : result });
    })
  },
  service : function (service) {
    entity['trip'].find ({service : service._id}, (err, trips) => {
      if(err) console.error(err);
      trips.forEach(trip => {
        trip.remove((err, result) => { // trigger post remove
          if (err) console.error(err);
          console.log({"TRIP => delete": result._id});
        })
      })
    })
    entity['route'].updateMany ({}, {$pull : { services : service._id }}, (err, result) => {
      if (err) console.error(err);
      console.log({"ROUTE => pull service id" : result});
    })
  }
}
