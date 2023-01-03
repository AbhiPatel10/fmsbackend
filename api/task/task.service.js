const Tasks = require("./task.model");
const { commonMessage } = require("../../config/messages");
const { taskMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");

exports.Exists = async (data) => {
  try {
    const role = await Tasks.findOne({ _id: data }).populate([
      "project_id",
      "AssignBy",
      "AssignTo",
    ]);
    return { success: true, message: commonMessage.taskDetaild, data: role };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_TASK_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const existRole = await Tasks.findOne({
      name: data.name,
      AssignTo: data.AssignTo,
    });
    if (existRole != null) {
      return {
        success: false,
        message: taskMessage.taskExist,
        data: existRole,
      };
    }
    const datum = new Tasks(data);
    const result = await datum.save();
    return {
      success: true,
      message: taskMessage.taskCreate,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_ADDING_TASK_DETAILS",
      data: error.message,
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Tasks, where, datum, [
      "project_id",
      "AssignBy",
      "AssignTo",
    ]);
    if (data.success === true) {
      return { success: true, message: taskMessage.taskList, data: data };
    } else {
      return {
        success: false,
        message: "ERROR_FETCHING_TASK_LIST",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_TASK_LIST",
      data: error.message,
    };
  }
};

exports.update = async (where, data) => {
  try {
    var Arr = where.toString().split(',');
    var myquery = { _id: Arr };
    var newvalues = { $set:  data  };
    const Task = await Tasks.updateMany(myquery, newvalues);
    return { success: true, message: taskMessage.taskUpdate, data: Task };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_TASK",
      data: error.message,
    };
  }
};
