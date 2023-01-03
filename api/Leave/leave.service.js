const Leave = require("./leave.model");
const { commonMessage } = require("../../config/messages");
const { leaveMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");
const commonResponse = require('../../shared/helpers/response')
const email = require('../../shared/helpers/email')
const moment = require("moment");

exports.Exists = async (data) => {
  try {
    const leave = await Leave.findOne({ user_id: data }).populate(['user_id']);
    return { success: true, message: "successs message", data: leave };
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
    const startdategrater = new Date(data.start_date)
    const startdateless = new Date(moment(data.start_date).add(1, "days").format("YYYY-MM-DD"))

    const enddategrater = new Date(data.end_date)
    const enddateless = new Date(moment(data.end_date).add(1, "days").format("YYYY-MM-DD"))

    const existLeave = await Leave.findOne({ user_id: data.user_id, start_date : {$gte: startdategrater.toISOString(), $lt: startdateless.toISOString() }, end_date : {$gte: enddategrater.toISOString(), $lt: enddateless.toISOString() }}); // $lt: req.params.edate

    if (existLeave != null) {
      return {
        success: false,
        message: leaveMessage.leaveExist,
        data: "",
      };
    }
    const datum = new Leave(data);
    const result = await datum.save();
    const { successMail, messageMail } = await email.sendForLeave(result);
    if(successMail){
      return {
        success: true,
        message:  leaveMessage.leaveCreate,
        data: result,
      };
    }else{
      return {
        success: false,
        message:  "dsd",
        data: "error while sendind email",
      };
    }
    
  } catch (error) {
    console.log("errorr", error)
    return {
      success: false,
      message: leaveMessage.leavecreateerror,
      data: "sdsdsd",
    };
  }
};

exports.list = async (where, datum) => {
  try {
    const data = await pagination.list(Leave, where, datum);
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
    var myquery = { user_id: Arr };
    var newvalues = { $set:  data  };
    const Leaveee = await Leave.updateMany(myquery, newvalues);
    return { success: true, message: leaveMessage.leaveUpdate, data: Leaveee };
  } catch (error) {
    return {
      success: false,
      message: "ERROR_UPDATING_ROLE",
      data: error.message,
    };
  }
};
