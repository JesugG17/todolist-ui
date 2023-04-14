import React from "react"

export const TodoList = React.memo(({ todo, handleDeleteTodo }) => {

  const { todoId, description } = todo;

  return (
    <ul className="list-group pointer">
      <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>{ description }</span>
          <button 
            className="btn btn-danger"
            onClick={() => handleDeleteTodo(todoId)}
          >
            Eliminar
          </button>
      </li>
    </ul>
  )
})
