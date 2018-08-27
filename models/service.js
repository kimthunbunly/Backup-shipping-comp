const mongoose = require ('mongoose');
const Schema  = mongoose.Schema;

const serviceSchema = new Schema ({
  company : {
    type : Schema.Types.ObjectId ,
    required : true ,
    ref : 'Company'
  },
  vehicles : [{
    type : Schema.Types.ObjectId ,
    required : true ,
    ref : 'Vehicle'
  }],
  type     : {
    type : [String],
    enum : ['Drop Off','Pick Up']
  } ,
  category : {
    type : String ,
    required : true ,
    trim : true ,
    enum : ['Standard','Express']
  },
  price    : { type : Number },
  collectDate    : { type : Date },
  deliveryDate   : { type : Date },
  "parcelVolumeMax" : { type : Number , default : 1 },
  "parcelWeightMax": { type : Number , default : 1000 },
  description : String ,
  status : String ,
  "maxVolume" : Number,
  "maxWeight" : Number,
  trips : [{
    type : Schema.Types.ObjectId ,
    required : true ,
    ref : 'Trip'
  }],
  routes : [{
    type : Schema.Types.ObjectId ,
    required : true ,
    ref : 'Route'
  }],
  unitWeight : {type : String , default : "Kg"},
  unitVolume : {type : String , default : "m3"},
  created   : { type : Date , default : Date.now }
});

serviceSchema.index ({ company : 1, category : 1 }, { unique : true });

serviceSchema.pre ('find' , function () {
  this.populate('company', 'name logo address');
  this.populate('vehicles', 'type volume');
})

serviceSchema.pre ('findOne' , function () {
  this.populate('company', 'name logo address');
  this.populate('vehicles', 'type ');
  this.populate('routes', 'from to ');
  this.populate('trips', '-service');
})

const Service = module.exports  = mongoose.model ('Service' , serviceSchema );

module.exports.pushRoute = function (id, route, callback) {
  Service.updateOne({_id : id, routes : {$nin : [route]}}, {$push : {routes: route }}, callback);
}
module.exports.pullRoute = function (id, route, callback) {
  Service.updateOne({_id : id}, {$pull : {routes: route }}, callback);
}
module.exports.pushTrip = function (id, trip, callback) {
  Service.updateOne({_id : id, trips : {$nin : [trip]}}, {$push : {trips: trip }}, callback);
}
module.exports.pullTrip = function (id, trip, callback) {
  Service.updateOne({_id : id}, {$pull : {trips: trip }}, callback);
}
