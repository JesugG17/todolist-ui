import React from "react"

export const TodoList = React.memo(({ todo, handleDeleteTodo }) => {

  return (
    <li className="list-group-item d-flex justify-content-between mb-2">
        <span>{ todo.description }</span>
        <button 
          className="btn btn-danger"
          onClick={() => handleDeleteTodo(todo)}
        >
          Eliminar
        </button>
    </li>
  )
})
