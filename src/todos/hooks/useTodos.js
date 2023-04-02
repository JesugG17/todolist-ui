import { useReducer, useRef } from "react";
import { todoReducer } from "../components/todoReducer";
import { getTodos, postTodo, deleteTodo } from "../helpers";

export const useTodos = (token) => {

    const tokenRef = useRef(token);
    
    const [todos, dispatch] = useReducer(todoReducer, []); 

    const addTodosFirstTime = async() => {
        const allTodos = await getTodos(tokenRef.current);
        const action = {
            type: 'init',
            payload: allTodos
        };

        dispatch(action);
    }

    const handleAddTodo = async( todo ) => {
        const newTodo = await postTodo(todo, tokenRef.current);
        const action = {
            type: 'add-todo',
            payload: newTodo
        }
        dispatch(action);
    }

    const handleDeleteTodo = async( id ) => {
        await deleteTodo(id, tokenRef.current);
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
