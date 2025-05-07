const { Schema, model } = require('../connection');

const userSchema = new Schema({
    name: String,
    email: { type: String, },
    password: { type: String, },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    scan: {
        type: Schema.Types.ObjectId,
        ref: 'Scan'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


module.exports = model('user', userSchema);