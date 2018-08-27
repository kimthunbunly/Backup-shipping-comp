const entity = require ('../../../globle/models');
const ETA = require('../../../models/functions/ETA');

module.exports.updateDepartTime = async function  (id , body, method,callback) {
  try {
    const trip = await entity['trip'].findById (id);
    const routes = await entity['route'].find({_id : trip.route}); // no populate

    const eta = new Date(body.departTime.toString());

    await ETA (eta, routes[0].duration);

    const update = {
      departTime : body.departTime,
      eta : eta
    }
    entity['trip'].findByIdAndUpdate(id, update, (err, updateTrip) => {
      if(err) console.error(err);
      callback(updateTrip);
    })
  } catch (ex) {
    res.status(400).json({ error: ex.message });
    console.log(ex.message);
  }
}

module.exports.removeTrip = async function (trip) {
  const trips = await entity ['trip'].find ({route : trip.route._id, service : trip.service._id});
  if (trips.length === 0) {
    entity ['service'].pullRoute (trip.service._id, trip.route._id, (err, result) => {
      if (err) console.error(err);
      console.log({service : result});
    })
    entity ['route'].pullService(trip.route._id, trip.service._id, (err, result) => {
      if (err) console.error(err);
      console.log({route : result});
    });
  }
}
