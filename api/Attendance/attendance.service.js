const Attendance = require("./attendance.model");
const { commonMessage } = require("../../config/messages");
const { attendanceMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");
const ISODate = require("isodate");
const moment = require("moment");
var mongodb = require('mongodb');

exports.create = async (data) => {
  try {
    const createdtime = await Attendance.find({
      userid: data.userid,
    });
    let inValid = false;
    let isCreate = true;
    let updatedData;
    if(createdtime.length > 0) {
      // find the index of record
      let index = createdtime.findIndex((res) => (moment(res.date).format('DD-MM-YYYY') === moment(data.date).format('DD-MM-YYYY')));
      // if index found then go in IF scope
      if(index != -1) {
        updatedData = createdtime[index];
        isCreate = false;
        // if Index not found then go ELSE scope
      }
      // if Date not todate then this will execute
      if(inValid) {
        return {
          success: false,
          message: attendanceMessage.attendancedateerror,
          data: null,
        };
      }
      // if record not found then this will execute
      if(isCreate) {
        const attendance = [{ time: data.date, status: "CHECKIN" }];
        const datum = new Attendance({ ...data, attendance });
        const result = await datum.save();
        return {
          success: true,
          message: attendanceMessage.attendanceCreate,
          data: result,
        };
      } else {
        // update will perform here
        updatedData.attendance[updatedData.attendance.length - 1].status == "CHECKIN"
        ? updatedData.attendance.push({ time: data.date, status: "CHECKOUT" })
        : updatedData.attendance.push({ time: data.date, status: "CHECKIN" });

        const Attendancedata = await Attendance.updateOne(
          { userid: data.userid, createdAt: updatedData.createdAt },
          {attendance : updatedData.attendance}
        );

        return {
          success: true,
          message: attendanceMessage.attendancetaskUpdate,
          data: {
            data: Attendancedata,
            status: updatedData.attendance[updatedData.attendance.length - 1].status
          },
        };
      }
    } else {
      const attendance = [{ time: data.date, status: "CHECKIN" }];
      const datum = new Attendance({ ...data, attendance });
      const result = await datum.save();
      return {
        success: true,
        message: attendanceMessage.attendanceCreate,
        data: {
          data:result,
          status: "CHECKIN"
        },
      };
    }

  } catch (error) {
    return {
      success: false,
      message: attendanceMessage.attendanceerror,
      data: error.message,
    };
  }
};
