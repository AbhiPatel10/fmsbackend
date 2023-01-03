const router = require('express').Router();
const ProfileService = require('./profile.service');
var jwt_auth = require("../../middleware/jwt_auth");

router.get('/:id', jwt_auth ,async (req, res) => {
    const {success, message, data} = await ProfileService.Exists(req.params.id);
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
router.post('/', jwt_auth, async (req, res) => {
    const {success, message, data} = await ProfileService.create(req, res);
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
    const {success, message, data} = await ProfileService.list(req.body.where, req.body.pagination);
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

router.put('/:id', jwt_auth, async (req, res) => {
    const {success, message, data} = await ProfileService.update(req.params.id, req.body);
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
    const {success, message, data} = await ProfileService.update(req.params.id, req.body);
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