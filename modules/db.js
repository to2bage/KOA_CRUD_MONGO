const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/employeedb";

// mongoose.connect(url, {useNewUrlParser: true}, (err) => {
//     if (err) {
//         console.log("连接数据库失败");
//     } else {
//         console.log("恭喜!!!连接数据库成功");
//     }
// })

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log("恭喜!!!连接数据库成功");
}).catch(err => {
    console.log("连接数据库失败: " + err);
})