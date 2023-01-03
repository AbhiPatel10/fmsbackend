const Dashboard = require("./dashboard.model");
const { commonMessage } = require("../../config/messages");
const { dashboardMessage } = require("../../config/messages");
const pagination = require("../../shared/helpers/pagination");
const RoleService = require("../roles/roles.service");
const RoleModel = require("../roles/roles.model");
const ProjectModel = require("../projects/projects.model");
const UserModel = require("../users/users.model");
const TaskModel = require("../task/task.model");
const moment = require("moment");
const ISODate = require("isodate");
const Attendance = require("../Attendance/attendance.model");

exports.list = async (where, id) => {
  try {
    const Troles = await RoleModel.countDocuments(where ? where : {});
    const Tprojects = await ProjectModel.countDocuments(where ? where : {});
    const Tusers = await UserModel.countDocuments(where ? where : {});
    const Ttask = await TaskModel.countDocuments(where ? where : {});
    let workhours = [];
    let attendancestatus;
    

    const count = {
      totalRole: Troles,
      totalProject: Tprojects,
      totalUsers: Tusers,
      totalTask: Ttask,
    };

    const whereday = { status: "DONE", AssignTo: id }; //, updatedAt:{$gte:ISODate(startDate),$lt:ISODate(endDate)}
    const taskDetails = await TaskModel.find(whereday);
    // const newtaskdonedayyyyyyy = await TaskModel.countDocuments(whereday ? whereday  : {})
    let taskGraphData = [];
    [1, 2, 3, 4, 5].forEach((i) => {
      const date = moment().startOf("week").add(i, "days").format("YYYY-MM-DD");
      // console.log("date", date)

      var detailstrue = taskDetails.map((data) =>  moment(data.updatedAt).format("YYYY-MM-DD") === date ? true : false
      );
      let count = 0;
      detailstrue.forEach((data) => {
        if (data) {
          count += 1;
        }
      });
      taskGraphData.push({
        date: date,
        TaskDone: count,
      });
    });
    const taskdetail = {
      status: "DONE",
    };

    const TtaskDetail = await TaskModel.find(taskdetail ? taskdetail : {});
    const taskListDetails = [];
    TtaskDetail &&
      TtaskDetail.forEach((data) => {
        taskListDetails.push({ Name: data.name, Status: data.status });
      });

    // user working Hours details

    const createdtime = await Attendance.find({
      userid: id,
    });


    const startdate = moment().startOf("week").add(1, "days").format("YYYY-MM-DD");
    const enddate = moment().endOf("week").subtract(1, "days").format("YYYY-MM-DD");

    createdtime.map((res, i) => {
      if (
        moment(res.date).format("YYYY-MM-DD") >= startdate &&
        moment(res.date).format("YYYY-MM-DD") <= enddate
      ) {
        let results = res.attendance
          .slice(1)
          .map((e, i) =>
            moment
              .utc(
                moment(res.attendance[i + 1].time).diff(
                  moment(res.attendance[i].time)
                )
              )
              .format("HH:mm:ss")
          );

        const ms = results.map((d) => moment.duration(d).asSeconds() * 1000);
        const sum = ms.reduce((prev, cur) => prev + cur, 0);
        const hms = moment.utc(sum).format("HH:mm:ss");

        workhours.push({ date: moment(res.date).format("DD-MM-yyyy"), totalhours: hms });
      }
      attendancestatus = res.attendance[ res.attendance.length - 1 ].status;
    });


    dataa = {
      count,
      taskGraphData,
      taskListDetails,
      workhours,
      attendancestatus,
      success: true,
    };
    if (dataa.success === true) {
      return {
        success: true,
        message: dashboardMessage.dashboardList,
        data: dataa,
      };
    } else {
      return {
        success: false,
        message: dashboardMessage.dashboardList,
        data: dataa,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR_FETCHING_DASHBOARD_LIST",
      data: error.message,
    };
  }
};
