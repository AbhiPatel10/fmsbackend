const Users = require("./users.model");
const { commonMessage } = require("../../config/messages");
const { userMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");
const bcrypt = require("bcryptjs");
const { email } = require("../../shared/helpers/send-email");
const commonResponse = require('../../shared/helpers/response')

exports.Exists = async (data) => {
  try {
    const User = await Users.findOne({ _id: data }).populate(["role"]);
    if(!User) {
      return commonResponse.send(res, req.languageCode, 'User Not Found', 400, {});
    }
    return { success: true, message: commonMessage.roleDetaild, data: User };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const existUser = await Users.findOne({ mobile: data.mobile });
    if (existUser != null) {
      return {
        success: false,
        message: userMessage.userExist,
        data: existUser,
      };
    } else {
      const generatePassword = () => {
        const length = 8;
        charset =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        retVal = "";
        for (var i = 0; (n = charset.length), i < length; i++) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
      };
      const newpassword = await generatePassword();

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(String(newpassword), salt);
      

      const datum = new Users({ ...data, password: encryptedPassword });

      const response = await email(newpassword, data);
      if (response.successMail) {
        const result = await datum.save();
        return {
          success: true,
          message: userMessage.userCreate,
          data: result,
        };
      } else {
        console.log("runnnn")
        return {
          success: false,
          message: "ERROR_ADDING_USER_DETAILS",
        };
      }
    }
  } catch (error) {
    console.log("errrorrrrr --->>>>",error)
    return {
      success: false,
      message: "ERROR_ADDING_USER_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Users, where, datum, ["role"]);
    if (data.success) {
      return { success: true, message: userMessage.userList, data: data };
    } else {
      return {
        success: false,
        message: "ERROR_FETCHING_USERS_LIST",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_USERS_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(",");
    var myquery = { _id: Arr };
    var newvalues = { $set: data };
    const User = await Users.updateMany(myquery, newvalues);
    if(!User) {
      return commonResponse.send(res, req.languageCode, 'Error while update User', 400, {});
    }
    return {
      success: true,
      message: userMessage.userUpdate,
      data: User,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_USER",
      data: error.message,
    };
  }
};
