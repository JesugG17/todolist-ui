import { useState } from "react";

export const TodoUpdate = ({ todo, handleUpdateTodo, setOpenModal }) => {

  const [value, setValue] = useState(todo.description);
  return (
    <div 
      className="modal"
      // onClick={ () =>  setOpenModal(false)}
    >
      <div className="card__update">
        <h4 className="text-center">Update Todo</h4>
        <form 
          onSubmit={(e) => e.preventDefault()}
          className="mb-2"
        >
          <input 
            className="form-control"
            value={ value }
            onChange={ (e) => setValue(e.target.value)}
            type="text" 
          
          />
        </form>
          <button 
            className="btn btn-primary"
            onClick={ () => {
              if (value.length === 0) return;
              handleUpdateTodo( todo, value );
              setOpenModal(false);
            }}
          >
            Update
          </button>
      </div>
    </div>
  )
}
