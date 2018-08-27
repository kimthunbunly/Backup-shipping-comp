const entity = require ('./object');

module.exports = async function (ent, choices , param) {
  if ( !entity [ent] ) return console.log ('No entity');
  else {
    const keys = Object.keys (entity [ent] );
    const model = entity[ent];
    const object = {};
    switch (param) {
      case 'update':
        for ( key of keys) {
          if ( choices [key] && (model[key] === 'String' || model[key] === 'Number') )
            object [key] = choices [key];
        }
        return object;
        break;
        case 'option':
          for ( key of keys) {
            if ( choices [key] ) object [key] = true;
          }
          return object;
          break;
      default: console.log ('Hello from queryField');
    }
  }
}
