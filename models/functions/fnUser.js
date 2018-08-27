const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hash = (schema) => {
    schema.pre('save', async function(next) {
        let schema = this;
        if(schema.isModified('password')) {
            let hash = await bcrypt.hash(schema.password, 10);
            schema.password = hash;

            next();
        }
    });
}

const token = (schema) => {
    schema.methods.genToken = function() {
        let token = jwt.sign({ _id: this._id, role: this.role }, 'jwtPrivateKey', { expiresIn: "1d"});
        return token;
    }
}

module.exports = { hash, token };