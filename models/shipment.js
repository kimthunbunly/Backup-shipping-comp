const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const Parcel   = require ('./parcel');
const Trip  = require ('./trip');

/*const paymentSchema = new Schema ({
  method     : { type : String , required : true , trim : true },
  cardNumber : { type : String , required : true , trim : true },
  expireDate : { type : Date   , required : true },
  secureCode : { type : String , required : true , trim : true }
});*/

const shipmentSchema = new Schema ( {
  trip    : { type : Schema.Types.ObjectId , required : true , ref: 'Trip' },
  nParcel  : { type : Number },
  parcels  : [{
    type : Schema.Types.ObjectId ,
    ref : 'Parcel',
    required : true
  }],
  "totalVolume" : Number,
  "totalWeight" : Number,
  price  : { type : Number, required : true },
  status : { type : Boolean , default : true },
  // parcelDetail   : {
  //   reason  : { type : String , trim : true },
  //   content : { type : String , trim : true }
  // },
  //sender : { type : Schema.Types.ObjectId , ref : 'Sender', required : true},
  //receiver : { type : Schema.Types.ObjectId , ref : 'Receiver', required : true},
  //payment : { type : paymentSchema },
  description : { type : String },
  unitWeight :{type : String ,default : "Kg"},
  unitVolume : {type : String ,default : "m3"},
  created : { type : Date , default : Date.now }
});
shipmentSchema.pre ('find' , function () {
  this.populate ('parcels', 'type totalWeight totalVolume quantity');
  this.populate ('trip','route service eta departTime');
});

shipmentSchema.pre ('findOne' , function () {
  this.populate ('parcels');
  this.populate ('trip','route service eta departTime');
});

shipmentSchema.pre ('save', function (next) {
  console.log(this);
  next();
})
shipmentSchema.post('save', async function (doc) {
  console.log(doc);
  Trip.decreaseSpace(doc.trip, doc["totalVolume"], doc['totalWeight'], (err, result)=> {
    if (err) console.error(err);
    console.log({"TRIP => decrease space" : result});
  });
})

shipmentSchema.post('remove' , function (doc) {
  console.log(doc);
  Parcel.remove({_id : {$in : doc.parcels }}, (err, result) => {
    if (err) console.error(err);
    console.log({"PARCEL => remove" : result});
  })
  Trip.increaseSpace( doc.trip, doc["totalVolume"], doc['totalWeight'], (err, result)=> {
    if (err) console.error(err);
    console.log({"TRIP => increase space" : result});
  });
});

module.exports = mongoose.model ('Shipment' , shipmentSchema );
