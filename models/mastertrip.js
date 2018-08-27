const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const Route = require('./route');
const Service = require('./service');
const asyncForEach = require('../globle/asyncForEach');
const ETA = require('./functions/ETA');

const mastertripSchema = new Schema ({
  option: { type: String, required: true },
  service : {
    type : Schema.Types.ObjectId ,
    required : true ,
    ref : 'Service'
  },
  route: {
    type : Schema.Types.ObjectId ,
    required : true ,
    ref : 'Route'
  },
  departTime : {
    type : Date,
    unique : true,
    required : true
  },
  eta : Date,
  maxVolume : Number,
  maxWeight : Number,
  availableVolume : Number,
  availableWeight : Number,
  price : Number,
  description : String,
  unitWeight : {type : String ,default : "Kg"},
  unitVolume : {type : String ,default : "m3"},
  created : { type : Date, default : Date.now }
});

mastertripSchema.index ( { service : 1, route : 1, departTime: 1} , {unique : true} );

mastertripSchema.pre ('find', function () {
  this
  .populate ({
    path : 'service',
    select : 'category type company'
  })
  .populate('route', 'from to');
});

mastertripSchema.pre('save', async function (next) {
  await preSave(this, next);
  next();
});

mastertripSchema.post ('save' , function (doc) {
  postSave(doc);
});

mastertripSchema.pre ('insertMany' , async function ( next, docs) {
  await asyncForEach(docs , async (doc) => {
    preSave(doc, next);
    postSave(doc);
  })
  next();
});
async function preSave(doc, next) {
  const routes = await Route.find({_id : doc.route});
  const services = await Service.find({_id : doc.service });

  if (!routes[0]) next('Not existed route');
  if (!services[0]) next('Not existed service');

  doc.eta = new Date(doc.departTime.toString());
  console.log(doc.eta);
  await ETA (doc.eta, routes[0].duration);
  doc["maxVolume"] = services[0]["maxVolume"];
  doc["maxWeight"] = services[0]["maxWeight"];
  doc["availableVolume"] = services[0]["maxVolume"];
  doc["availableWeight"] = services[0]["maxWeight"];
  if (doc.price === undefined) doc.price = 0;
  doc.price = doc.price + routes[0].price + services[0].price;
}

function postSave (doc) {
  Route.pushTrip (doc.route, doc._id, (err, result) => {
    if(err) console.error(err);
    console.log({"ROUTE => push trip id" : result});
  });
  Route.pushService (doc.route, doc.service, (err, result) => {
    if(err) console.error(err);
    console.log({"ROUTE => push service id" : result});
  });
  Service.pushTrip (doc.service, doc._id, (err, result) => {
    if(err) console.error(err);
    console.log({"SERVICE => push trip id" : result});
  });
  Service.pushRoute (doc.service, doc.route, (err, result) => {
    if(err) console.error(err);
    console.log({"SERVICE => push route id" : result});
  });
}

mastertripSchema.post ('remove' , function (doc) {
  Route.pullTrip(doc.route, doc._id , (err, result) => {
    console.log ({"ROUTE => pull trip id" : result});
  });
  Service.pullTrip(doc.service, doc._id , (err, result) => {
    console.log ({"SERVICE => pull trip id" : result});
  });
});

const Trip = module.exports  = mongoose.model ('MasterTrip' , mastertripSchema );

module.exports.increaseSpace = function (_id, volume, weight, callback) {
  const update = {
    $inc : { "availableVolume" : volume , "availableWeight" : weight }
  }
  Trip.updateOne({_id}, update, callback);
}
module.exports.decreaseSpace = function (_id, volume, weight, callback) {
  const update = {
    $inc : { "availableVolume" : -volume , "availableWeight" : -weight }
  }
  Trip.updateOne({_id}, update, callback);
}
