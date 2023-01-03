const Project = require("./projects.model");
const { commonMessage } = require("../../config/messages");
const { projectsMessage } = require("../../config/messages");
const pagination = require('../../shared/helpers/pagination');


exports.Exists = async (data) => {
  try {
    const role = await Project.findOne({ _id: data }).populate(['manager','team']);
    return { success: true, message: commonMessage.roleDetaild, data: role };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_PROJECTS_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const existRole = await Project.findOne({ name: data.name});
    if (existRole != null) {
      return {
        success: false,
        message: projectsMessage.projectsExist,
        data: existRole,
      };
    }
    const datum = new Project(data);
    const result = await datum.save();
    return {
      success: true,
      message: projectsMessage.projectsCreate,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_Project_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Project, where, datum, ['manager','team']);
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
    const Projects = await Project.updateMany(myquery, newvalues);
    return { success: true, message: projectsMessage.projectsUpdate, data: Projects };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_Project",
      data: error.message,
    };
  }
};
