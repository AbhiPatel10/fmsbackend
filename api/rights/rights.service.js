const Rights = require("./rights.model");
const { commonMessage } = require("../../config/messages");
const { rightsMessage } = require("../../config/messages");
const pagination = require('../../shared/helpers/pagination');


exports.Exists = async (data) => {
  try {
    const role = await Rights.findOne({ _id: data }).populate(['user_id', 'role_id', 'rights.SidebarID']);
    return { success: true, message: commonMessage.roleDetaild, data: role };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_RIGHTS_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const existRole = await Rights.findOne({ user_id: data.user_id});
    if (existRole != null) {
      return {
        success: false,
        message: rightsMessage.rightsExist,
        data: existRole,
      };
    }
    const datum = new Rights(data);
    const result = await datum.save();
    return {
      success: true,
      message: rightsMessage.rightsCreate,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_RIGHTS_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Rights, where, datum, ['user_id', 'role_id', 'rights.SidebarID']);
    if (data.success === true) {
      return { success: true, message: rightsMessage.rightsList, data: data };
    }else{
      return {
        success: false,
        message: "ERROR_FETCHING_RIGHTS_LIST",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_RIGHTS_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(',');
    var myquery = { _id: Arr };
    var newvalues = { $set:  data  };
    const Right = await Rights.updateMany(myquery, newvalues);
    return { success: true, message: rightsMessage.rightsUpdate, data: Right };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_RIGHTS",
      data: error.message,
    };
  }
};
