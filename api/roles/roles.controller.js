const router = require('express').Router();
const RoleService = require('./roles.service');
const UserService = require('../users/users.service');
var jwt_auth = require("../../middleware/jwt_auth");
const roleValidator = require('./role.validator');
const { roleMessage } = require('../../config/messages')

router.get('/:id', jwt_auth, roleValidator.id,  async (req, res) => {
    const {success, message, data} = await RoleService.Exists(req.params.id);
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
router.post('/', jwt_auth, roleValidator.create,  async (req, res) => {
    const {success, message, data} = await RoleService.create(req.body);
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
    const {success, message, data} = await RoleService.list(User.data.role?.name === 'admin' ? '': req.body.where , req.body.pagination);
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

router.put('/:id', jwt_auth , roleValidator.id, roleValidator.updaterole, async (req, res) => {
    const {success, message, data} = await RoleService.update( req.params.id, req.body);
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
    const {success, message, data} = await RoleService.update(req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: roleMessage.roleDelete,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: roleMessage.roleDeleteError,
            data: data
        })
    }

})

module.exports = router;