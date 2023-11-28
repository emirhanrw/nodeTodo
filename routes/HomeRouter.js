const route = require('express').Router()
const HomeController = require('../controllers/HomeController')



route.delete('/deleteTodo/:id', HomeController.deleteTodo)
route.post('/addTodo', HomeController.addTodo)
route.use('/', HomeController.home)

module.exports = route