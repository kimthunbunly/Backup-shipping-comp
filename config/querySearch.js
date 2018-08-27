const object = require ('./object');
const ObjectID = require ('mongoose').Types.ObjectId;

async function querySearch (entity, query , callback) {
  let select = {};
  const keys = Object.keys( object [entity] );
  const ent = object [entity];

  for ( key of keys) {
    switch (ent [key]) {
      case 'String':
        if ( query [key]) select[key] = {$regex: query [key], $options:'i' }
        break;
        case 'Number':
        if ( query [key]) select[key] = {$eq : parseInt(query [key])}
          break;
          // case 'ObjectId':
          // if ( query [key] && ObjectID.isValid(query[key])) select[key] = {$in : query [key] };
          //   break;
          //   case 'ArrayId':
          //     if ( query [key] && ObjectID.isValid(query[key])) select[key] = {$in : query [key] };
          //     break;
      default: continue;
    }
  }
  callback(select);
}

module.exports = querySearch;
