const router = require("express").Router();
const UserService = require("./users.service");
const multer = require("multer")
const Users = require("./users.model");
var fs = require('fs');
var jwt_auth = require("../../middleware/jwt_auth");
const cloudinary = require("../../shared/helpers/cloudinary")
const userValidator = require('./user.validator');
const { userMessage  } = require('../../config/messages')

// Storage
const Storage = multer.diskStorage({
  filename:(req, file, cb) => {
    cb(null, file.originalname );
  },
}) 



router.put("/profile", jwt_auth, multer({storage: Storage}).single('Image'), async (req, res) => {
  try {
   await cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
    } else {
      let { data, success, message } = await UserService.Exists(req.body.id);
     
      data['image'] = result.url;
   
      if(success){
        const updateddata = await UserService.update(data._id, data);
        res.status(200).send({
          success: updateddata.success,
          message: updateddata.message,
          data: updateddata.data,
        });
      }
      else {
        res.status(400).send({
          success: success,
          message: message,
          data: data,
        });
      }
    }
  });
}catch (error) {
  return {
    success: false,
    message: "ERROR_UPDATING_USER",
    data: error.message,
  };
}
});

router.get("/:id", jwt_auth, userValidator.id,  async (req, res) => {
  const { success, message, data } = await UserService.Exists(req.params.id);
  if (success) {
    res.status(200).send({
      success: success,
      message: message,
      data: data,
    });
  } else {
    res.status(400).send({
      success: success,
      message: message,
      data: data,
    });
  }
});

router.post("/", jwt_auth, userValidator.create, async (req, res) => {
  const { success, message, data } = await UserService.create(req.body);
  if (success) {
    res.status(200).send({
      success: success,
      message: message,
      data: data,
    });
  } else {
    res.status(400).send({
      success: success,
      message: message,
      data: data,
    });
  }
});

router.post("/list", jwt_auth, async (req, res) => {
  const User = await UserService.Exists(req.user.id);
  if(!User.success){
      res.status(400).send({
          success: User.success,
          message: User.message,
          data: User.data
      })
  }
  const { success, message, data } = await UserService.list(
    User.data.role?.name === 'admin' ? '': req.body.where,
    req.body.pagination
  );
  if (success) {
    res.status(200).send({
      success: success,
      message: message,
      data: data,
    });
  } else {
    res.status(400).send({
      success: success,
      message: message,
      data: data,
    });
  }
});

router.put("/:id", jwt_auth, userValidator.id, userValidator.updateuser,  async (req, res) => {
  const { success, message, data } = await UserService.update(
     req.params.id ,
    req.body
  );
  if (success) {
    res.status(200).send({
      success: success,
      message: message,
      data: data,
    });
  } else {
    res.status(400).send({
      success: success,
      message: message,
      data: data,
    });
  }
});

router.delete("/:id", jwt_auth, async (req, res) => {
  const { success, message, data } = await UserService.update(
    req.params.id ,
    req.body
  );
  if (success) {
    res.status(200).send({
      success: success,
      message: userMessage.userDelete,
      data: data,
    });
  } else {
    res.status(400).send({
      success: success,
      message: userMessage.userDeleteError,
      data: data,
    });
  }
});

module.exports = router;
