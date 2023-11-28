const todoAddForm = document.querySelector('#todoAddForm')

function newTodo(todoText, todoId){
    const todos_container = document.querySelector('#todos_container')
    const firstChild = todos_container.firstElementChild;
    const newItemLi = document.createElement('li')
    newItemLi.className = "list-group-item d-flex justify-content-between"
    newItemLi.id = todoId
    newItemLi.textContent = todoText

    newItemIcon = document.createElement('i')
    newItemIcon.className = "fa fa-remove"

    newItemA = document.createElement('a')
    newItemA.className = "delete-item"
    newItemA.href = "#"
    newItemA.appendChild(newItemIcon)

    newItemLi.appendChild(newItemA)

    if(firstChild){
        todos_container.insertBefore(newItemLi, firstChild)
    }else{
        todos_container.appendChild(newItemLi)
    }
}

function message(message, classMessage){
    const messageHtml = document.querySelector('#messageHtml')
    messageHtml.innerHTML = `<div class="alert alert-${classMessage}">${message}</div>`
}

todoAddForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const todoText = {
        "todoText": document.querySelector('#todoName').value
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todoText)
    }
    fetch('/addTodo', options)
    .then(res => res.json())
    .then(data => {
        message(data.message, data.classMessage)
        newTodo(data.todoText, data.todoId)
        document.querySelector('#todoName').value = ''
        setTimeout(() => {
            document.querySelector('#messageHtml').innerHTML = ''
        }, 3000);
        
    })
    .catch(err => {
        message('Todo ekleme işlemi başarısız : '+err, 'danger')
        setTimeout(() => {
            document.querySelector('#messageHtml').innerHTML = ''
        }, 3000);
    })
})

const delete_item = document.querySelectorAll('.delete-item')
delete_item.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        e.preventDefault()
        const removeLi = element.parentElement
        const removeId = removeLi.id
        removeLi.classList.add('removeItem')
        deleteUrl = '/deleteTodo/'+removeId
        fetch(deleteUrl, {method:"DELETE"})
        .then(res=>res.json())
        .then(data=>{
            message(data.message, data.classMessage)
            setTimeout(() => {
                document.querySelector('#messageHtml').innerHTML = ''
            }, 3000);
        })
        .catch(err=>{
            console.log(err);
            message('Todo silinirken hata oluştu : '+err, 'danger')
            setTimeout(() => {
                document.querySelector('#messageHtml').innerHTML = ''
            }, 3000);
        })
        window.scrollTo(0, 0);
    })
})