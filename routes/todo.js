const express = require("express");
const router = express.Router();
const { authentication } = require("../config/auth");

const db = require("../models");
const Todo = db.Todo;
const User = db.User;

//顯示全部
router.get("/", authentication, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user){
            throw new Error("User is not found.")
        }
        Todo.findAll({
            raw: true,
            nest: true,
            where: { UserId: req.user.id }
        })
        .then((todos) => res.render("index", { todos: todos }))
        .catch(err => console.log(err))
    })
})
//瀏覽
router.get("/:id", authentication, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user){
            throw new Error("user not found")
        }
        return Todo.findOne({
            where:{ 
                UserId: req.user.id,
                Id: req.params.id
            }
        })
        .then(todo => res.render("detail", { todo: todo.get() }))
        .catch(err => res.status(422)/json(err))
    })
})
//新增
router.get("/new", authentication, (req, res) => {
    res.send("Add")
})

router.post("/new", authentication, (req, res) => {
    Todo.create({
        name: req.body.name,
        done: false,
        UserId: req.user.id
    })
    .then(todo => res.redirect("/"))
    .catch(err => res.status(422).json(err))
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