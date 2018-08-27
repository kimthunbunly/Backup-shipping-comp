const mongoose = require ('mongoose');

const vehicleSchema = new mongoose.Schema ({
  type   : { type : String , required : true , unique : true , trim : true },
  "volume" : { type : Number , required : true },
  description : String ,
  unitVolume  : { type : String , default : "m3"},
  created     : { type : Date , default : Date.now }
});

module.exports = mongoose.model ('Vehicle' , vehicleSchema );
