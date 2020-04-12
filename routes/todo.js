const express = require("express");
const router = express.Router();
const { authentication } = require("../config/auth");

const db = require("../models");
const Todo = db.Todo;
const User = db.User;

//顯示全部
router.get("/", authentication, (req, res) => {
    User.findByPk(req.user.id)
    .then((user) => {
        if(!user) throw new Error("User is not found.")
        return Todo.findAll({
            raw: true,
            nest: true,
            where: { UserId: req.user.id }
        })
    })
    .then(todos => {
        console.log(todos)
        return res.render("index", { todos: todos })
    })
    .catch(err => res.status(422).json(err))
})
//新增
router.get("/new", authentication, (req, res) => {
    return res.render("new")
})

router.post("/new", authentication, (req, res) => {
    console.log(req.body)
    Todo.create({
        name: req.body.name,
        done: req.body.done === "on",
        UserId: req.user.id
    })
    .then(todo => res.redirect("/todos"))
    .catch(err => res.status(422).json(err))
})
//瀏覽
router.get("/:id/find", authentication, (req, res) => {
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
        .catch(err => res.status(422).json(err))
    })
})
//修改頁面？
router.get("/:id/edit", authentication, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user) throw new Error("User not found.")
        return Todo.findOne({
            Id: req.params.id,
            UserId: req.user.id
        })
        .then(todo => res.render("edit", { todo: todo.get() }))
    })
})
//修改 todo
router.put("/:id/modify", authentication, (req, res) => {
    Todo.findOne({
        Id: req.params.id,
        UserId: req.user.id
    })
    .then(todo => {
        todo.name = req.body.name
        todo.done = req.body.done === "on"
        return todo.save()
    })
    .then(todo => res.redirect(`/todos/${req.params.id}`))
    .catch(err=> res.status(422).json(err))
})
//刪除
router.delete("/:id/delete", authentication, (req, res) => {
    User.findByPk(req.user.id)
    .then(user => {
        if(!user) throw new Error("User is not found.")
        return Todo.destory({
            where: {
                UserId: req.user.id,
                Id: req.params.id
            }
        })
    })
    .then(todo => res.redirect("/"))
    .catch(err => res.status(422).json(err))
})

module.exports = router;