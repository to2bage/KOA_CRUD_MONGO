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
    // console.log(ctx.request.body);
    // 存入数据库
    const employee = new Employee();
    employee.fullName = ctx.request.body.fullName;
    employee.email = ctx.request.body.email;
    employee.mobile = ctx.request.body.mobile;
    employee.city = ctx.request.body.city;
    try {
        let docs = await employee.save()
        console.log("=>", docs);
        ctx.redirect("/list");
    } catch (err) {
        if (err.name == "ValidationError") {
            handleError(ctx, err)
            next()
        }
    }
})

router.post("/", async (ctx, next) => {
    console.log("Something is Wrong");
    // ctx.redirect("/bad");
    await ctx.render("employee/employeeInsertOrEdit", {
        viewTitle: "Insert Employee Error",
        employee: ctx.request.body
    })
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

module.exports = router;