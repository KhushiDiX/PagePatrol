const { Schema, model } = require('../connection');

const scanSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    targetUrl: String,
    status: {
        type: String,
        enum: ['Pending', 'Running', 'Completed', 'Failed'],
        default: 'Pending',
    },
    startedAt: Date,
    finishedAt: Date,
    brokenLink: {
        type: Schema.Types.ObjectId,
        ref: 'BrokenLink'
    },
    orphanedPage: [string] //array of URLs
});

module.exports = model('Scans', scanSchema);