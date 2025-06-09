// @ Desc   - This is the common error function which will capture all kind of errors in controllers  and save in database

// console.log('error middleware file ')
// const ErrorsCaptured = require('../Common-ModelControllerRoute/Models/ErrorCapture-Model'); 

const ErrorsCaptured = require('../Models/ErrorCapture');

async function errorHandler(err, reqParam, res, next) {
    const { password, retype_password, ...req } = reqParam;
    try {
        const errorobject = new ErrorsCaptured({
            api_name: req.action,
            api_url: req.url,
            error_mongo_code: err.code,
            error_mongo_name: req.body,
            request_body: err.name,
            err_full_message: err,
        });

        await errorobject.save();

        if (err.name === 'ValidationError') {
            const mongoErr = err.message;

            return res.status(400).json({
                success: false,
                MongoError: mongoErr.split(','),
                CustomMessage: ' Mongoose validation error - Notification server',
                Mongo_Errortype: err.name,
            });
        }
        if (err.name === 'MongoError' && err.code === 11000) {
            const ermsg = err.errmsg

                .replace(/[':'",.<>\{\}\[\]\\\/]/gi, '')
                .replace('dup key', '')
                .replace('_1', ' :');
            return res.status(400).json({
                errors: {
                    success: false,
                    MongoError: ermsg,
                    CustomMessage: ' Duplicate Key error from mongo database - Notification server ',
                },
            });
        }
        return res.status(400).json({
            success: false,
            error: err.message,
            CustomMessage: 'Something is seriouly wrong,This is last CATCH block - Notification server',
            controller_name: req.action,
            // response : response
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
            CustomMessage:
                'Something is seriouly wrong,This is last CATCH block,Check your error database collection - Notification server',
            controller_name: req.action,
            // response : response
        });
    }
}

module.exports = errorHandler;
