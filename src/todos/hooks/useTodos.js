import { useReducer } from 'react';
import { todoReducer } from '../components/todoReducer';
import { getTodos, postTodo, deleteTodo } from '../helpers';

export const useTodos = () => {
    
    const [todos, dispatch] = useReducer(todoReducer, []); 

    const addTodosFirstTime = async() => {
        const allTodos = await getTodos();
        const action = {
            type: 'init',
            payload: allTodos
        };

        dispatch(action);
    }

    const handleAddTodo = async( todo ) => {
        const newTodo = await postTodo(todo);
        const action = {
            type: 'add-todo',
            payload: newTodo
        }
        dispatch(action);
    }

    const handleDeleteTodo = async( id ) => {
        await deleteTodo(id);
        const action = {
            type: 'delete-todo',
            payload: id
        }
        dispatch(action);
    }

    return {
        todos,
        addTodosFirstTime,
        handleAddTodo,
        handleDeleteTodo
    }


}
