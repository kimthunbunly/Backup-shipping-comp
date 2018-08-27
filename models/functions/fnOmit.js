const _ = require('lodash');

module.exports = (schema, omit) => {
    schema.methods.toJSON = function() {
        let schema = this;
        let object = schema.toObject();
        return _.omit(object, omit);
    }
}