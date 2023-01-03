const router = require('express').Router();
const SidebarService = require('./sidebar.service');
var jwt_auth = require("../../middleware/jwt_auth");
const sidebarValidator = require('./sidebar.validator');
const UserService = require('../users/users.service');
const { sidebarMessage } = require('../../config/messages')

router.get('/:id',  jwt_auth, sidebarValidator.id, async (req, res) => {
    const {success, message, data} = await SidebarService.Exists(req.params.id);
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
router.post('/', jwt_auth, sidebarValidator.create,  async (req, res) => {
    const {success, message, data} = await SidebarService.create(req.body);
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
    const {success, message, data} = await SidebarService.list(User.data.role?.name === 'admin' ? '': req.body.where, req.body.pagination);
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

router.put('/:id', jwt_auth, sidebarValidator.id, sidebarValidator.update,  async (req, res) => {
    const {success, message, data} = await SidebarService.update(req.params.id, req.body);
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
    const {success, message, data} = await SidebarService.update(req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: sidebarMessage.sidebarDelete,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: sidebarMessage.sidebarDeleteError,
            data: data
        })
    }

})

module.exports = router;