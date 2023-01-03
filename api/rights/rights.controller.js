const router = require('express').Router();
const RightsService = require('./rights.service');
var jwt_auth = require("../../middleware/jwt_auth");
const RightsValidator = require('./rights.validator')
const UserService = require('../users/users.service')
const { rightsMessage } = require('../../config/messages')

router.get('/:id', jwt_auth, RightsValidator.id,  async (req, res) => {
    const {success, message, data} = await RightsService.Exists(req.params.id);
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
router.post('/', jwt_auth, RightsValidator.create,  async (req, res) => {
    const {success, message, data} = await RightsService.create(req.body);
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

router.post('/list', jwt_auth, async (req, res) => {
    const User = await UserService.Exists(req.user.id);
    if(!User.success){
        res.status(400).send({
            success: User.success,
            message: User.message,
            data: User.data
        })
    }
    const {success, message, data} = await RightsService.list(User.data.role?.name === 'admin' ? '': req.body.where, req.body.pagination);
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

router.put('/:id',jwt_auth, RightsValidator.id, RightsValidator.updaterights,  async (req, res) => {
    const {success, message, data} = await RightsService.update(req.params.id, req.body);
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

router.delete('/:id', jwt_auth, async (req, res) => {
    const {success, message, data} = await RightsService.update(req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: rightsMessage.rightsDelete,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: rightsMessage.rightsDeleteError,
            data: data
        })
    }

})

module.exports = router;