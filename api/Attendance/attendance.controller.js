const router = require('express').Router();
const AttendanceService = require('./attendance.service');
var jwt_auth = require("../../middleware/jwt_auth");
const attendanceValidator = require('./attendance.validator')

router.post('/', attendanceValidator.create, jwt_auth, async (req, res) => {
    const {success, message, data} = await AttendanceService.create(req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: message,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: message,
            data: data
        })
    }
})


module.exports = router;