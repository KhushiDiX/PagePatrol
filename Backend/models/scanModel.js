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
    brokenLinks: [{
        url: String,
        statusCode: String,
        foundOn: [String]
    }],
    orphanedPages: [String] // array of URLs
}, {
    timestamps: true
});

module.exports = model('Scans', scanSchema);