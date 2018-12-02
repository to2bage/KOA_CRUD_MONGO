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
EmployeeSchema.path("email").validate((value) => {
    let emailPattern= /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    return emailPattern.test(value);
}, "电子邮件的格式不正确");

module.exports.Employee = mongoose.model("Employee", EmployeeSchema);