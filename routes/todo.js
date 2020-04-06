const express = require("express");
const router = express.Router();
const { authentication } = require("../config/auth");

const db = require("../models");
const Todo = db.Todo;
const User = db.User;

//顯示全部
router.get("/", authentication, (req, res) => {
    res.send("show all")
})
//瀏覽
router.get("/:id", authentication, (req, res) => {
    res.send("Browser")
})
//新增
router.post("/new", authentication, (req, res) => {
    res.send("Add")
})
//修改頁面？
router.get("/:id/edit", authentication, (req, res) => {
    res.send("Modify")
})
//修改 todo
router.put("/:id", authentication, (req, res) => {
    res.send("Modify todo")
})
//刪除
router.get("/:id/delete", authentication, (req, res) => {
    res.send("Remove")
})

module.exports = router;