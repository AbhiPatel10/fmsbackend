const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const Role = mongoose.model('Roles', roleSchema);

module.exports = Role;