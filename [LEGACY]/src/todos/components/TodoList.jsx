import React from "react"

export const TodoList = React.memo(({ todo, handleDeleteTodo, setOpenModal, setTodo, handleToggleTodo }) => {

  const { todoId, description } = todo;

  return (
    <ul className="list-group pointer">
      <li className={`list-group-item d-flex justify-content-between align-items-center`}>
          <span
            className={`${ !todo.estatus && "text-decoration-line-through"}`}
            onClick={() => handleToggleTodo(todoId)}
          >
            { description }
          </span>
          <div className="actions__buttons">
            <button
              className="btn btn-primary"
              onClick={() => {
                setOpenModal(true);
                setTodo(todo);
              }}
            >
              Editar
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => handleDeleteTodo(todoId)}
            >
              Eliminar
            </button>
          </div>
      </li>
    </ul>
  )
})
