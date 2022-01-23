let todos = localStorage.getItem("todos")

try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch (error) {
    todos = null
}

if (!todos) {
    todos = [
        { contento: "Shopping", status: true },
        { contento: "Like videos", status: true },
        { contento: "Watch videos", status: true },
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}

function createTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item"
        let content = document.createElement("span")
        content.textContent = todo.contento
        content.style.textDecoration = todo.status ? "initial" : "line-through"
        console.log(todo)
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "images/download.png"
        deleteBtn.alt = "delet img"
        deleteBtn.className = "float-start"

        li.append(content)
        li.append(deleteBtn)

        todosList.append(li)

        deleteBtn.addEventListener('click', e => {
            todos.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })

        content.addEventListener('click', e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })

    })


}
createTodos(todos)

// action add & search

let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action => {

    if (action.dataset.action == "add") {
        action.addEventListener('click', e => {
            formWrapper.innerHTML = `
                <form id="add">
                <input class="form-control" name="add" placeholder="add todo ...">
                </form>`

            let add = document.querySelector("#add")
            add.addEventListener('submit', e => {
                e.preventDefault()
                if (add.add.value) {
                    todos.push({ contento : add.add.value , status: true })
                    localStorage.setItem("todos", JSON.stringify(todos))
                    createTodos(todos)
                }
            })
        })
    } else if (action.dataset.action == "search") {
        action.addEventListener('click', e => {
            formWrapper.innerHTML = `
            <form id="search">
			<input class="form-control" name="search" placeholder="search todos ...">
		    </form>`

            let search = document.querySelector("#search")
            search.addEventListener('keyup', e => {
                e.preventDefault()
                if (search.search.value) {
                    let filterd_todos = todos.filter(todo => todo.contento.toLowerCase().includes(search.search.value.toLowerCase()))
                    createTodos(filterd_todos)
                } else{
                    createTodos(todos)
                }
            })

        })

    }
})