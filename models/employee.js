const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true,
        default: Date.now()
    },
    department: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;