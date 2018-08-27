const mongoose = require ('mongoose');
const getPrice = require('../globle/parcelPrice');

const parcelSchema = new mongoose.Schema ({
  quantity : { type : Number , required : true },
  type    : { type : String, require : true,  enum : ['package','envelope']},
  length  : { type : Number , required : true },
  width   : { type : Number , required : true },
  height  : { type : Number , required : true },
  weight  : { type : Number , required : true , max : [1000, 'Too heavy']},
  volume  : { type : Number , max: [1, 'Too Big']},
  price   : { type : Number },
  totalVolume : { type : Number },
  totalWeight : { type : Number },
  description : { type : String },
  unitDimension : {type : String , default : "cm"},
  unitWeight  : { type : String , default : "Kg"},
  unitVolume  : { type : String , default : "m3"},
  created     : { type : Date , default : Date.now }
});

parcelSchema.pre ('save' , function (next) {
  let volumeCm = this['length'] * this['width'] * this['height'];
  let totalPrice = getPrice (volumeCm, this.weight, this.quantity);
  this["volume"] = volumeCm / 1000000;
  this["totalVolume"] = volumeCm / 1000000 * this.quantity;
  this["totalWeight"] = this["weight"] * this.quantity;
  this.price = totalPrice * this.quantity;
  next();
});

module.exports = mongoose.model ('Parcel' , parcelSchema );
