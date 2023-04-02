import { useReducer } from "react";
import { todoReducer } from "../components/todoReducer";
import { getTodos, postTodo, deleteTodo } from "../helpers";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjgwNDExMjExLCJleHAiOjE2ODA0MjU2MTF9.Tmnje9eSMNGgvUeKm-5_klwK7H6dPe5_0AcAQsaS-T0';

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, []); 

    const addTodosFirstTime = async() => {
        const allTodos = await getTodos(token);
        const action = {
            type: 'init',
            payload: allTodos
        };

        dispatch(action);
    }

    const handleAddTodo = async( todo ) => {
        const newTodo = await postTodo(todo, token);
        const action = {
            type: 'add-todo',
            payload: newTodo
        }
        dispatch(action);
    }

    const handleDeleteTodo = async( id ) => {
        await deleteTodo(id, token);
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
