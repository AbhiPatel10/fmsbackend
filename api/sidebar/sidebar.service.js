const Sidebar = require("./sidebar.model");
const { commonMessage } = require("../../config/messages");
const { sidebarMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");

exports.Exists = async (data) => {
  try {
    const role = await Sidebar.findOne({ _id: data });
    return { success: true, message: commonMessage.sidebarDetail, data: role };
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
    const existSidebar = await Sidebar.findOne({ name: data.name });
    if (existSidebar != null) {
      return {
        success: false,
        message: sidebarMessage.sidebarExist,
        data: existSidebar,
      };
    }
    const datum = new Sidebar(data);
    const result = await datum.save();
    return {
      success: true,
      message: sidebarMessage.sidebarCreate,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_SIDEBAR_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Sidebar, where, datum);
    if (data.success === true) {
      return { success: true, message: sidebarMessage.sidebarList, data: data };
    } else {
      return {
        success: false,
        message: "ERROR_FETCHING_SIDEBAR_LIST",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_SIDEBAR_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(',');
    var myquery = { _id: Arr };
    var newvalues = { $set:  data  };
    const Sidebarr = await Sidebar.updateMany(myquery, newvalues);
    return { success: true, message: sidebarMessage.sidebarUpdate, data: Sidebarr };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_SIDEBAR",
      data: error.message,
    };
  }
};
