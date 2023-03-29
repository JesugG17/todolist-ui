import { useEffect, useState } from "react";
import { deleteTodo, getTodos, postTodo } from "../helpers";
import { TodoList } from "./TodoList";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMDYzNjgyLCJleHAiOjE2ODAwNzgwODJ9.gYK2D3yVFq94PkLIuo8O-4LzUq7iyC2HILbAAOYShjc';
export const TodoApp = () => {
    
    const [formState, setFormState] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        addTodosFirstTime();
    },[]);

    const addTodosFirstTime = async() => {
        const allTodos = await getTodos(token);
        setTodos(allTodos);
    }

    const handleAddTodo = async(event) => {
        event.preventDefault();
        const todo = await postTodo(formState, token);
        setTodos([...todos, todo]);
        setFormState('');
    }

    const handleDeleteTodo = async({ todoId }) => {
       
        const { todo: todoDeleted } = await deleteTodo(todoId, token);
        console.log(todoDeleted);
        const newTodos = todos.filter(todo => todo.todoId !== todoDeleted.todoId );
        setTodos(newTodos);
    }

    const onInputChange = ({ target }) => {
        const value = target.value;
        setFormState( value );
    }

  return (
    <>
        <form onSubmit={handleAddTodo}>
            <input 
                type="text"
                placeholder="Tareas por hacer"
                className="form-control mb-"
                name="description"
                value={ formState }
                onChange={ onInputChange } 
            />
        </form>
        <hr />
    
        <div>
            {
                todos.map( (todo, index) => {
                    return (
                        <TodoList
                            key={index}
                            todo={ todo }
                            handleDeleteTodo={ handleDeleteTodo }
                        />
                    )
                })
            }
        </div>
    
    </>
  )
}
