const todo = require('../models/TodoModel')
const home = async (req, res) => {
    try {
        const todos = await todo.find({}).sort({ createdAt: -1 })
        res.status(200).render('index',{todos})
    } catch (err) {
        console.log('errorr : '+err);
        res.status(200);
    }
}
const addTodo = async (req, res) => {
    console.log(req.body);
    try {
        const todoAdd = new todo(req.body)
        await todoAdd.save()
        res.status(200).json({
            status: true,
            message: "Todo eklendi!",
            todoId: todoAdd._id,
            todoText: todoAdd.todoText,
            classMessage: "success"
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Todo eklenirken hata oluştu!",
            classMessage: "danger"
        })
    }
}

const deleteTodo = async (req, res)=>{
    const { id } = req.params
    try {
        await todo.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Silme işlemi başarılı!",
            classMessage: "success"
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: false,
            message: "Silme işlemi başarısız!",
            classMessage: "danger"
        })
    }
}
module.exports = {
    home,
    addTodo,
    deleteTodo,
}