const RoleController = require("../../api/roles/roles.controller")
const UserController = require("../../api/users/users.controller")
const LoginController = require("../../api/login/login.controller")
const SideBarController = require("../../api/sidebar/sidebar.controller")
const RightsController = require("../../api/rights/rights.controller")
const ProjectsController = require("../../api/projects/projects.controller")
const TaskController = require("../../api/task/task.controller")
const ProfileController = require("../../api/Profile/profile.controller")
const DashboardController = require("../../api/dashboard/dashboard.controller")
const AttendanceController = require("../../api/Attendance/attendance.controller")
const LeaveController = require("../../api/Leave/leave.controller")

const initialize = (app) => {
    app.use('/api/role', RoleController);
    app.use('/api/user', UserController);
    app.use('/login', LoginController);
    app.use('/api/sidebar', SideBarController);
    app.use('/api/rights', RightsController);
    app.use('/api/project', ProjectsController);
    app.use('/api/task', TaskController);
    app.use('/api/profile', ProfileController);
    app.use('/api/dashboard', DashboardController);
    app.use('/api/attendance', AttendanceController);
    app.use('/api/leave', LeaveController);
}

module.exports = {initialize};