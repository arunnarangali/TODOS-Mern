const express=require('express')
const { getToDo, SavetoDo, updateToDo, deletetoDo } = require('../Controler/docontroler')

const routes=express.Router()

routes.route('/').get(getToDo)
routes.route('/save').post(SavetoDo)
routes.route('/updateTodo/:id').put(updateToDo)
routes.route('/deleteTodo/:id').delete(deletetoDo)

module.exports=routes