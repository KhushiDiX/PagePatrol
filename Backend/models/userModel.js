const { Schema, model } = require('../connection');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
    },
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