import { useForm } from "../../hooks/useForm";


export const TodoAdd = ({ handleAddTodo }) => {

    const { description, onInputChange, onResetForm } = useForm({
        description: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (description.length < 1 ) return;
        
        console.log(description);
        handleAddTodo(description);
        onResetForm();
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Tareas por hacer'
                className='form-control mb-'
                name='description'
                value={description}
                onChange={onInputChange}
            />
        </form>
        <div className='button-container'>
            <button
                type='submit'
                className='btn btn-outline-primary todo-add-button'
                onClick={handleSubmit}
            >
                Add
            </button>
        </div>

    </>
  );
};
