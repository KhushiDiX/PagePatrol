const { Schema, model } = require('../connection');

const userSchema = new Schema({
    name: String,
    email: { type: String, },
    password: { type: String, },
    role: {
        type: String,
        enum: ['admin, user']
    },
    scan: {
        type: Schema.Types.ObjectId,
        ref: 'scan'
    }
});


module.exports = model('user', userSchema);