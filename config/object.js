const object = {
  company  : {
    _id : 'ObjectId',
    name : 'String',
    address : 'String',
    contact : 'String',
    logo : 'String',
    rate : 'Number',
    website : 'String',
    description : 'String'
  },
  vehicle  : {
    _id : 'ObjectId',
    type : 'String',
    volume : 'Number',
    description : 'String',
  },
  parcel   : {
    _id : 'ObjectId',
    qty : 'Number',
    lengthInCm : true,
    widthInCm : true,
    heightInCm : true,
    price : 'Number',
    description : 'String'
  },
  route    : {
    _id : 'ObjectId',
    from : 'String',
    to : 'String',
    distance : 'Number',
    duration : 'Date',
    price : 'Number',
    description : 'String',
    services : 'ArrayId',
    trips : 'ArrayId'
  },
  service  : {
    _id : 'ObjectId',
    vehicles : 'ArrayId',
    company : 'ObjectId',
    type : 'ArrayString',
    category : 'String',
    price : 'Number',
    collectDate : true,
    deliveryDate : true,
    routes : 'ArrayId',
    status : 'String',
    description : 'String'
  },
  trip : {
    _id : 'ObjectId',
    service : 'ObjectId',
    route : 'ObjectId',
    departTime : 'String',
    eta : 'String',
    availableVolume : 'Number',
    availableWeight : 'Number'
  },
  sender  : {
    _id : 'ObjectId',
    firstName : 'String',
    lastName : 'String',
    company : 'String',
    email : 'String',
    phone : 'String',
    address : 'String',
    town : 'String',
    postcode : 'String',
    description : 'String'
  },
  receiver  : {
    _id : 'ObjectId',
    firstName : 'String',
    lastName : 'String',
    company : 'String',
    email : 'String',
    phone : 'String',
    address : 'String',
    town : 'String',
    postcode : 'String',
    description : 'String'
  },
  shipment : {
    _id : 'ObjectId',
    trip : 'ObjectId',
    parcels : 'ArrayId',
    parcelDetail : true,
    sender : 'ObjectId',
    receiver : 'ObjectId',
    //payment : true,
    status : 'String',
    description : 'String'
  },
  user     : {
    _id : 'ObjectId',
    firstName : 'String',
    lastName : 'String',
    email : 'String',
    phone : 'String',
    address : 'String',
    shipments : 'ArrayId'
  },
  mastertrip: {
    
  }
}

module.exports = object;
