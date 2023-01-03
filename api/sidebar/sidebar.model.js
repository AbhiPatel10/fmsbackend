const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sidebarSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    route: {
        type: String,
        trim: true,
        required: true,
    },
    icon: {
        type: String,
        trim: true,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const Sidebar = mongoose.model('SideBar', sidebarSchema);

module.exports = Sidebar;