const Profile = require("./profile.model");
const { commonMessage } = require("../../config/messages");
const { projectsMessage } = require("../../config/messages");
const pagination = require('../../shared/helpers/pagination');
const multer = require("multer")


// Storage
const Storage = multer.diskStorage({
  destination:'public/images/profile_image',
  filename:(req, file, cb) => {
    cb(null, file.originalname );
  },
})
const upload = multer({
  storage: Storage
}).single('Image')


exports.Exists = async (data) => {
  try {
    const role = await Profile.findOne({ _id: data }).populate(['manager','team']);
    return { success: true, message: commonMessage.roleDetaild, data: role };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_PROJECTS_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (req, res) => {
  try {
    upload(req, res, async (err)=>{
      // console.log("image req",req.body);
      // console.log("image mimetype",req.file.mimetype);
      if(err){
        // console.log('errrorrrrrr', err)
        return(err)
      }else{
        const newImage = new Profile({
          image:{
            data : req.file.originalname,
            contentType: 'image/png'
          }
        })
        const result = await  newImage.save();
        return {
          success: true,
          message: projectsMessage.projectsCreate,
          data: result,
        };
      }
    } )
    return {
          success: true,
          message: projectsMessage.projectsCreate,
          data: 'dd',
        };

  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_Profile_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Profile, where, datum, ['manager','team']);
    if (data.success === true) {
      return { success: true, message: projectsMessage.projectsList, data: data };
    }else{
      return {
        success: false,
        message: "ERROR_FETCHING_Project_LIST",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_Project_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(',');
    var myquery = { _id: Arr };
    var newvalues = { $set:  data  };
    const Profilee = await Profile.updateMany(myquery, newvalues);
    return { success: true, message: projectsMessage.projectsUpdate, data: Profilee };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_Project",
      data: error.message,
    };
  }
};
