const router = require('express').Router();
const ProjectsService = require('./projects.service');
var jwt_auth = require("../../middleware/jwt_auth");
const projectValidator = require('./project.validator');
const UserService = require('../users/users.service')
const { projectsMessage } = require('../../config/messages')

router.get('/:id', jwt_auth, projectValidator.id,  async (req, res) => {
    const {success, message, data} = await ProjectsService.Exists(req.params.id);
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
router.post('/', jwt_auth, projectValidator.create,  async (req, res) => {
    const {success, message, data} = await ProjectsService.create(req.body);
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
    const {success, message, data} = await ProjectsService.list(User.data.role?.name === 'admin' ? '': req.body.where, req.body.pagination);
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

router.put('/:id', jwt_auth, projectValidator.id, projectValidator.updateProject,  async (req, res) => {
    const {success, message, data} = await ProjectsService.update(req.params.id, req.body);
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
    const {success, message, data} = await ProjectsService.update( req.params.id, req.body);
    if(success) {
        res.status(200).send({
            success: success,
            message: projectsMessage.projectDelete,
            data: data
        })
    } else {
        res.status(400).send({
            success: success,
            message: projectsMessage.projectDeleteError,
            data: data
        })
    }

})

module.exports = router;