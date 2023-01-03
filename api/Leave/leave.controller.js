const router = require('express').Router();
const LeaveService = require('./leave.service');
const UserService = require('../users/users.service');
var jwt_auth = require("../../middleware/jwt_auth");
const leaveValidator = require('./leave.validator');
const commonResponse =  require('../../shared/helpers/response');
const email = require('../../shared/helpers/email')

router.get('/:status/:id', async(req, res) => {
    try{
        const {success, message, data} = await LeaveService.Exists(req.params.id);
        if(success){
            console.log("req.params.status", req.params.status)
            let LeaveUpdate = await LeaveService.update(req.params.id , { status: req.params.status})
            console.log("LeaveUpdate ---->>>>", LeaveUpdate)
            if(LeaveUpdate.success){
                const { successMail, messageMail } = await email.sendForstatus(data, req.params.status);
                if(successMail){
                    return commonResponse.success(res, null , req.languageCode, "Mail Sended Successfully")         
                }else{
                    return commonResponse.send(res, req.languageCode,  messageMail, 400)
                }
            }else{
                return commonResponse.send(res, req.languageCode,  "Error While Update Leave", 400)
            }
        }else{
            return commonResponse.keyAlreadyExist(res, message, req.languageCode, message)
        }
        
    }catch(error){
        commonResponse.sendUnexpected(res, error, req.languageCode, error);
    }
})

router.get('/:id', leaveValidator.id, jwt_auth, async (req, res) => {
    try{
        const {success, message, data} = await LeaveService.Exists(req.params.id);
        if(success) {
            commonResponse.success(res, data, req.languageCode, message);
        } else {
            commonResponse.keyAlreadyExist(res, data, req.languageCode, message);
        }
    }catch(error){
        commonResponse.sendUnexpected(res, error, req.languageCode, error);
    }
    })
router.post('/', leaveValidator.create, jwt_auth, async (req, res) => {
    try{
        const {success, message, data} = await LeaveService.create(req.body);
        if(success) {
            commonResponse.success(res, data, req.languageCode, message)
        } else {
            commonResponse.send(res, req.languageCode, message,  400)
        }
    }catch(error){
        console.log("eeeerrrr--->", error)
        commonResponse.sendUnexpected(res, error, req.languageCode, error)
    }
})

router.post('/list', jwt_auth, async (req, res) => {
    const User = await UserService.Exists(req.user.id);
    if(!User.success){
        res.status(400).send({
            success: User.success,
            message: User.message,
            data: User.data
        })
    }
    const {success, message, data} = await LeaveService.list(User.data.role?.name === 'admin' ? '': req.body.where , req.body.pagination);
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

router.put('/:id', leaveValidator.id, leaveValidator.updaterole, jwt_auth ,async (req, res) => {
    const {success, message, data} = await LeaveService.update( req.params.id, req.body);
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

router.delete('/:id', leaveValidator.id,  jwt_auth, async (req, res) => {
    const {success, message, data} = await LeaveService.update(req.params.id, req.body);
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