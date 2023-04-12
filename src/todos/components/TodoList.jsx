import React from "react"

export const TodoList = React.memo(({ todo, handleDeleteTodo }) => {

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>{ todo.description }</span>
          <button 
            className="btn btn-danger"
            onClick={() => handleDeleteTodo(todo.todoId)}
          >
            Eliminar
          </button>
      </li>
    </ul>
  )
})
