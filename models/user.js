const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
require('mongoose-type-email');
const { hash, token } = require('./functions/fnUser');

const userSchema = new mongoose.Schema({
    email: { type: mongoose.SchemaTypes.Email, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    country: { type: String, required: false },
    postCode: { type: String, required: false },
    shipments : [{
      type : Schema.Types.ObjectId ,
      required : true ,
      ref : 'Shipment'
    }]
});

hash(userSchema);
token(userSchema);

const User = module.exports = mongoose.model('User', userSchema);

module.exports.pushShipment = function (id, shipment, callback) {
  User.updateOne({_id : id, shipments : {$nin : [shipment]}}, {$push : {shipments: shipment }}, callback);
}
module.exports.pullShipment = function (id, shipment, callback) {
  User.updateOne({_id : id}, {$pull : {shipments: shipment }}, callback);
}
