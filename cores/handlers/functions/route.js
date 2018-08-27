const entity = require ('../../../globle/models');
const ETA = require('../../../models/functions/ETA');

module.exports.updateDuration = async function (id, body, method, callback) {
  try {
    const route = await entity['route'].findByIdAndUpdate(id, {duration : body.duration});
    const trips = await entity['trip'].find({route : id});

    trips.forEach (trip => {
      let eta = trip.departTime;
      ETA(eta, body.duration);
      entity['trip'].updateOne({_id : trip._id}, {eta : eta}, (err, result) => {
        if (err) console.error(err);
        console.log({'TRIP => update eta': result});
      })
    })
    callback(route);
  } catch (ex) {
    res.status(400).json({ error: ex.message });
    console.log(ex.message);
  }
}
