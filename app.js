const express = require("express")               
const app = express()                    
             
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const port = 3000

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

// 設定路由
app.get("/", (req, res) => {
  res.send("hello world")
})

//認證系統路由
app.get("/users/login", (req, res) => {
    res.render("login")
})

app.post("/users/login", (req, res) => {
    res.send("認證檢查")
})

app.get("/users/register", (req, res) => {
    res.render("register")
})

app.post("/users/register", (req, res) => {
    res.send("註冊檢查")
})

app.get("/users/logout", (req, res) => {
    res.send("成功登出")
})

// 設定 express port 3000
app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})