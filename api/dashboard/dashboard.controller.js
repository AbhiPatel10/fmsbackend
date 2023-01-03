const router = require('express').Router();
const DashboardService = require('./dashboard.service');
var jwt_auth = require("../../middleware/jwt_auth");
const UserService = require('../users/users.service')



router.post('/list', jwt_auth, async (req, res) => {
    const User = await UserService.Exists(req.user.id);
    if(!User.success){
        res.status(400).send({
            success: User.success,
            message: User.message,
            data: User.data
        })
    }

    const where = {
        "isActive": true
    };
    const {success, message, data} = await DashboardService.list(User.data.role?.name === 'admin' ? '': where, req.body.userid);
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