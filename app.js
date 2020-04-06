const express = require("express")               
const app = express()                    
             
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const session = require("express-session");
const passport = require("passport");
const { authentication } = require("./config/auth");

const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//session config
app.use(session({
  secret: "Your key",
  resave: "false",
  saveUninitialized: "false"
}))

//啟動 passport
app.use(passport.initialize())
//session 配合 passport 
app.use(passport.session())
//passport 定義的邏輯
require("./config/passport")(passport)
//讓 user 可以在所有地方被使用，使用 req.user 即可獲得
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// 設定路由
app.get("/", authentication, (req, res) => {
  res.send("List all todos")
})

//使用者登入、登出路由
app.use("/users", require("./routes/user"))
//todo list CRUD
app.use("/todos", require("./routes/todo"))

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})