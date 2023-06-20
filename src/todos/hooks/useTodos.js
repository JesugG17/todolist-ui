import { useReducer } from 'react';
import { todoReducer } from '../components/todoReducer';
import { getTodos, postTodo, deleteTodo, updateTodo } from '../helpers';

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

    const handleUpdateTodo = async( todo, newDescription ) => {
        await updateTodo(todo.todoId, newDescription);
        const action = {
            type: 'update-todo',
            payload: {
                ...todo,
                description: newDescription
            }
        }
        dispatch(action);
    }

    const handleToggleTodo = ( id ) => {
        const action = {
            type: 'toggle-todo',
            payload: id
        }
        dispatch(action);
    }

    return {
        todos,
        addTodosFirstTime,
        handleAddTodo,
        handleDeleteTodo,
        handleToggleTodo,
        handleUpdateTodo
    }


}
