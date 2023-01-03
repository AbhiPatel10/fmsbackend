const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const commonResponse = require('../../shared/helpers/response');
// const customLogger = require('../../shared/helpers/customLogger');

exports.create = (req, res, next) => {
    try {
        if(req.body) {
            const schema = Joi.object().keys({
                userid: Joi.objectId().required(),
                date: Joi.string().required(),
            })
            let data = schema.validate(req.body);
            if(data.hasOwnProperty('error')) {
                commonResponse.sendJoiError(res, 'REQUIRED_FIELD_VALIDATION', req.languageCode, data.error);
            } else {
                next();
            }
        } else {
            commonResponse.notFound(res, req.languageCode, 'BODY NOT FOUND');
        }
    } catch(err) {
        // customLogger.error("error api/user/user.validator.js  edit profile ==>", error);
        return commonResponse.sendUnexpected(res, err, req.languageCode, err);
    }
}
