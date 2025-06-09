const mongoose = require('mongoose');
mongoose.set('debug', true);
const db2 = require('../Middleware/db2');

// Developer note
// ErrorsCaptured model is stored in 'DatabaseIkram_SECOND' mongodb A/c = syedhaq.merndev@gmail.com

const CaptureErrorsSchema = new mongoose.Schema({
    api_name: { type: String, trim: true, required: true },
    api_url: { type: String, trim: true },
    error_mongo_code: { type: String, trim: true },
    error_mongo_name: { type: Object, trim: true },
    request_body: { type: String, trim: true },
    err_full_message: { type: String, trim: true },
    create_at: { type: Date, required: true, default: Date.now },

    // writeConcern: {
    //     w: "majority",
    //     j: true,
    //     wtimeout: 1000,
    // },
});

module.exports = db2.model('ErrorsCaptured', CaptureErrorsSchema);
