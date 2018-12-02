const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "必填项目!!!"]
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

// EmployeeSchema.path("fullName").required(true); // 也可以这样写

module.exports.Employee = mongoose.model("Employee", EmployeeSchema);