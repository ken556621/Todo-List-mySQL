const express = require("express")               
const app = express()                    
             
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const db = require("./models");
const Todo = db.Todo;
const User = db.User;

const port = 3000

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// 設定路由
app.get("/", (req, res) => {
  res.send("hello world")
})

//使用者登入、登出路由
app.use("/users", require("./routes/user"))

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})