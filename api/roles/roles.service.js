const Role = require("./roles.model");
const { commonMessage } = require("../../config/messages");
const { roleMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");

exports.Exists = async (data) => {
  try {
    const role = await Role.findOne({ _id: data });
    return { success: true, message: commonMessage.roleDetail, data: role };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_ROLE_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const existRole = await Role.findOne({ name: data.name });
    if (existRole != null) {
      return {
        success: false,
        message: roleMessage.roleExist,
        data: existRole,
      };
    }
    const datum = new Role(data);
    const result = await datum.save();
    return {
      success: true,
      message: roleMessage.roleCreate,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_ROLE_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Role, where, datum);
    if (data.success === true) {
      return { success: true, message: roleMessage.roleList, data: data };
    } else {
      return {
        success: false,
        message: "ERROR_FETCHING_ROLE_LIST",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_ROLE_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(",");
    var myquery = { _id: Arr };
    var newvalues = { $set:  data  };
    const role = await Role.updateMany(myquery, newvalues);
    return { success: true, message: roleMessage.roleUpdate, data: role };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_ROLE",
      data: error.message,
    };
  }
};
