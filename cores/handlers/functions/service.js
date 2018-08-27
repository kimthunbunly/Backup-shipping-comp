const entity = require ('../../../globle/models');

module.exports.updateVehicle = async function (id, body, method, callback) {
  try {
    const vehicle = await entity['vehicle'].findById(body.vehicle);
    const filter = {_id : id};
    let update = undefined;
    let updateTrip = undefined;

    if (method === 'add') {
      filter["vehicles"] = {$nin : [vehicle._id]};
      update = {
        $push : {vehicles : vehicle._id},
        $inc : {
          "maxVolume" : vehicle['volume'] ,
          "maxWeight" : vehicle['volume'] * 1000
        }
      }
      updateTrip = {
        $inc : {
          "availableVolume" : vehicle['volume'] ,
          "availableWeight" : vehicle['volume'] * 1000,
          "maxVolume" : vehicle['volume'],
          "maxWeight" : vehicle['volume'] * 1000
        }
      }
    } else if (method === 'remove') {
      filter["vehicles"] = vehicle._id;
      update = {
        $pull : {vehicles : vehicle._id},
        $inc : {
          "maxVolume" : -vehicle['volume'] ,
          "maxWeight" : -vehicle['volume'] * 1000
        }
      }
      updateTrip = {
        $inc : {
          "availableVolume" : -vehicle['volume'] ,
          "availableWeight" : -vehicle['volume'] * 1000,
          "maxVolume" : -vehicle['volume'],
          "maxWeight" : -vehicle['volume'] * 1000
        }
      }
    }
    entity['service'].findOneAndUpdate( filter, update, (err, doc) => {
      if (err)  console.error(err);
      if (!doc) callback({error : 'Not existed service or duplicate vehicle!'})
      else {
        callback(doc);
        entity['trip'].updateMany({service: doc._id}, updateTrip, (err, result) => {
          if (err)  console.error(err);
          console.log({"TRIP => update space": result});
        })
      }
    })
  } catch (ex) {
    res.status(400).json({ error: ex.message });
    console.log(ex.message);
  }

}
