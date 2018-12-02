const Router = require("koa-router");
const router = new Router();
const { Employee } = require("../../modules/employee/employee.model.js");
const util = require("util");

router.get("/", async (ctx, next) => {
    // ctx.body = "this is a Index page";
    await ctx.render("employee/employeeInsertOrEdit", {
        viewTitle: "Insert Employee",
    })
})

router.post("/", async (ctx, next) => {
    console.log(ctx.request.body);
    // 存入数据库
    const employee = new Employee();
    employee.fullName = ctx.request.body.fullName;
    employee.email = ctx.request.body.email;
    employee.mobile = ctx.request.body.mobile;
    employee.city = ctx.request.body.city;
    employee.save().then((docs) => {
        console.log("存入数据库成功");
        console.log(docs);
        ctx.redirect("/success");
    }).catch(err => {
        ctx.redirect("/errors");
        if (err.errors) {
            handleError(ctx, err);
            console.log("添加错误之后\n", ctx.request.body);
            // ctx.render("employee/employeeInsertOrEdit", {
            //     viewTitle: "Error Insert",
            //     employee: ctx.request.body
            // })
            // console.log("redirect to /errors");
            // ctx.redirect("/error");
            return Promise.resolve(err)
        }
    }).then(data => {
        // console.log("data => ", data);
        ctx.redirect("/errors");
    })
    //#region model.proptye.save()使用回调函数
    // employee.save((err, docs) => {
    //     if (err) {
    //         // console.log(err);
    //         if (err.errors) {
    //             // console.log(err.errors.fullName.kind);
    //             // console.log(err.errors.fullName.path);
    //             // console.log(err.errors.fullName.value);
    //             // console.log(err.errors.fullName.message);
    //             handleError(ctx, err);
    //             console.log("添加错误之后\n", ctx.request.body);
    //             // 渲染
    //             ctx.render("employee/employeeInsertOrEdit", {
    //                 viewTitle: "Error Insert",
    //                 // employee: ctx.request.body
    //             })
    //         }
    //     } else {
    //         console.log("存入数据库成功");
    //         console.log(docs);
    //     }
    // })
    //#endregion
})


function handleError(ctx, err) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case "fullName":
                ctx.request.body["fullNameError"] = err.errors.fullName.message;
                break;
            case "email":
                ctx.request.body["emailError"] = err.errors.email.message;
                break;
            case "mobile":
                ctx.request.body["mobileError"] = err.errors.mobile.message;
                break;
            case "city":
                ctx.request.body["cityError"] = err.errors.city.message;
                break;
        }
    }
}

function renderErrorMessage () {
    return new Promise((resolve, reject) => {

    })
}

module.exports = router;