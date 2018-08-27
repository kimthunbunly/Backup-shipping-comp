const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema ({
  from  : { type : String , required : true , trim : true },
  to    : { type : String , required : true , trim : true },
  price : { type : Number },
  distance : { type : Number },
  duration : {
    type : String ,
    validate : {
      validator : function (v) {
        return /^(0[0-9]|1[0-9]|2[0-4]):[0-5][0-9][h]$/.test(v);
      },
      message : 'Incorrect format (HH:MMh)'
    },
    required : true
  },
  description : { type : String },
  unitDistance : { type : String , default : "Km" },
  services : [{
    type: Schema.Types.ObjectId,
    required : true,
    ref: 'Service'
  }],
  trips : [{
    type: Schema.Types.ObjectId,
    required : true,
    ref: 'Trip'
  }],
  created     : { type : Date , default : Date.now }
});

routeSchema.index ({ from : 1, to : 1 }, { unique : true });

routeSchema.pre('findOne' , function () {
  this.
  populate({
    path : 'services',
    populate : {
      path : 'company',
      select : 'name -_id '
    },
    select : 'category -_id'
  }).
  populate('trips', 'departTime eta -_id');
});

const Route = module.exports = mongoose.model ('Route' , routeSchema );

module.exports.pushTrip = function (id, trip, callback) {
  Route.updateOne({ _id : id, trips : {$nin : [trip]} }, {$push : {trips : trip }}, callback);
}
module.exports.pullTrip = function (id, trip, callback) {
  Route.updateOne({ _id : id}, {$pull : {trips : trip }}, callback);
}

module.exports.pushService = function (id, service, callback) {
  Route.updateOne({ _id : id, services : {$nin : [service]} }, {$push : {services : service }}, callback);
}
module.exports.pullService = function (id, service, callback) {
  Route.updateOne({ _id : id}, {$pull : {services : service }}, callback);
}
