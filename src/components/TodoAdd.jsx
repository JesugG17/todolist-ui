import { useForm } from "../hooks/useForm";

export const TodoAdd = ({ handleAddTodo }) => {

    const { description, onInputChange, onResetForm } = useForm({
        description: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddTodo(description);
        onResetForm();
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Tareas por hacer"
            className="form-control mb-"
            name="description"
            value={description}
            onChange={onInputChange}
        />
        </form>
        <button
            className="btn btn-outline-primary mt-1"
            onClick={handleSubmit}
        >
            Submit
        </button>

    </>
  );
};
