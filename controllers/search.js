const router   = require ('express').Router();

//models
const Route    = require ('../models/route'),
      Trip     = require ('../models/trip'),
      Service  = require ('../models/service');

//function
const getPrice = require('../globle/parcelPrice');

router.get ('/', (req, res) => {
  res.json('Welcome to search route');
})

router.post ('/:from-:to', async (req, res) => {
  const parcels = req.body.parcelData;
  let totalVolume = 0, parcelPrice = 0,
      totalWeight = 0,
      num = 0;
  parcels.forEach(p => {
    let volumeCm = p.width * p.length * p.height;
    parcelPrice += getPrice (volumeCm, p.weight, p.quantity);
    totalVolume += volumeCm / 1000000 * p.quantity;
    totalWeight += p.weight * p.quantity;
    num += p.quantity;
  })

  const date = new Date();
  date.setHours(date.getHours() + 2); // expend 2 hours for delivery
  console.log(date.toString());
  const query = [
    {departTime : {$gte : date}},
    {
      "route.from" : req.params.from,
      "route.to" : req.params.to
    },
    {"availableVolume": {$gte : totalVolume}},
    {"availableWeight": {$gte : totalWeight}}
  ]
  if(req.query.type) query.push({"service.type" : req.query.type});

  const routeLookup   = new Lookup ('routes', 'route','_id','route');
  const serviceLookup = new Lookup ('services', 'service','_id','service');
  const companyLookup = new Lookup ('companies', 'service.company','_id','service.company');
  const projection = {
    route : {from : 1, to : 1, price : 1},
    service : {
      company : {name :1,logo : 1, address:1},
      type : 1,
      category : 1
    },
    "departTime": 1,
    "eta": 1,
    "maxVolume": 1,
    "maxWeight": 1,
    "availableVolume": 1,
    "availableWeight": 1,
    "price": 1,
    "unitVolume" : 1,
    "unitWeight" : 1
  };
  Trip.aggregate([
    {$lookup : routeLookup},
    {$unwind : '$route'},
    {$lookup : serviceLookup},
    {$unwind : '$service'},
    {$lookup : companyLookup},
    {$unwind : '$service.company'},
    {$match : {$and : query }},
    {$project : projection}
  ]).exec((err, trips) => {
      if (err) console.error(err);
      //res.json(trips);
      if (trips.length > 0) {
        console.log(trips.length);
        let mapData = trips.map((doc) => {
          doc.price = (doc.price + parcelPrice).toFixed(2);

          date.setHours(date.getHours() - 2); // expend 2 hours for delivery
          // get total seconds between the times
          let delta = Math.abs(doc.eta - date) / 1000;

          // // calculate (and subtract) whole days
          // let days = Math.floor(delta / 86400);
          // delta -= days * 86400;

          // calculate (and subtract) whole hours
          let hours = Math.floor(delta / 3600)// % 24;
          delta -= hours * 3600;

          // calculate (and subtract) whole minutes
          //let minutes = Math.floor(delta / 60) % 60;
          //delta -= minutes * 60;

          doc.eta = (hours + 1) + 'hours';

          return doc;
        })
        res.json(mapData);
      } else {
        res.json('there is no available trip!');
      }
  });

  function Lookup (from, localField, foreignField, as) {
    this.from = from,
    this.localField = localField,
    this.foreignField = foreignField,
    this.as = as
  }
})

module.exports = router;
