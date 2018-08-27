const entity = require ('../globle/models');
const asyncForEach = require ('../globle/asyncForEach');

module.exports = {
  service: function (req , res , next) {
    entity['vehicle'].find ({_id: {$in: req.body.vehicles}}, (err, vehicles) => {
      let total = 0;
      vehicles.forEach((v) => {
        total += v["volume"];
      });
      req.body["maxVolume"] = total;
      req.body["maxWeight"] = total * 1000;
      next();
    });
  },
  shipment: function (req , res , next) {
    const body = req.body;
    entity ['trip'].findById (body.trip , (err, trip) => {
      if (err) console.error(err);
      if (trip) {
        start (body.parcels)
        .then((obj) => {
          let t = false;
          t = checkTrip (trip, obj.totalVolume, obj.totalWeight);
          if (t === true) {
            body.parcels = obj.parcelIds;
            body["totalVolume"] = obj.totalVolume;
            body["totalWeight"] = obj.totalWeight;
            body['nParcel'] = obj.totalParcel;
            body['price'] = obj.totalPrice + trip.price;
            next();
          }
          else next(t);
        })
        .catch(console.error);
      } else {
        res.json ('Not existed trip');
      }
    });
  }
}

const start = async (parcels) => {
  let parcelIds = [];
  let totalVolume = 0;
  let totalWeight = 0;
  let totalParcel = 0;
  let totalPrice = 0;
  await asyncForEach (parcels, async (parcel) => {
    const promise = entity ['parcel'].create (parcel);
    await promise.then((parcel) => {
      parcelIds.push (parcel._id);
      totalVolume += parcel["totalVolume"];
      totalWeight += parcel["totalWeight"];
      totalParcel += parcel.quantity;
      totalPrice += parcel.price;
    })
    .catch (console.error);
  })
  return { parcelIds, totalVolume, totalWeight , totalParcel, totalPrice};
}

function checkTrip (trip ,totalVolume, totalWeight) {
  let volume = trip.get('availableVolume'),
      weight = trip.get('availableWeight');
  console.log({volume,weight});
  if ( volume >= totalVolume && weight >= totalWeight) {
    return true;
  }
  else {
    return 'Oop! there is no enough space!';
    console.log('Oop! there is no enough space!');
  }
}
