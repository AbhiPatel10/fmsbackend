const router = require('express').Router();
const taskService = require('./task.service');
var jwt_auth = require("../../middleware/jwt_auth");
const taskvalidator = require('./task.validator');
const UserService = require('../users/users.service');
const { taskMessage } = require('../../config/messages')

router.get('/:id', jwt_auth, taskvalidator.id, async (req, res) => {
    const {success, message, data} = await taskService.Exists(req.params.id);
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
router.post('/', jwt_auth, taskvalidator.create, async (req, res) => {
    const {success, message, data} = await taskService.create(req.body);
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
    const {success, message, data} = await taskService.list(User.data.role?.name === 'admin' ? '': req.body.where, req.body.pagination);
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

router.put('/:id', jwt_auth, taskvalidator.id, taskvalidator.update,  async (req, res) => {
    const {success, message, data} = await taskService.update( req.params.id, req.body);
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
    const {success, message, data} = await taskService.update( req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: taskMessage.taskDelete,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: taskMessage.taskDeleteError,
            data: data
        })
    }

})

module.exports = router;