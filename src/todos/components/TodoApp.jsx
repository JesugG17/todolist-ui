import { useContext, useEffect } from 'react';
import { TodoList } from './TodoList';
import { useTodos } from '../hooks/useTodos';
import { TodoAdd } from './TodoAdd';
import { AuthContext } from '../../auth/context';
import { Header } from './Header';
import { api } from '../../api/api';
import { useState } from 'react';
import { TodoUpdate } from './TodoUpdate';

export const TodoApp = () => {

    const { user: { nombre, token } } = useContext(AuthContext);
    const { todos,
            addTodosFirstTime,
            handleAddTodo,
            handleUpdateTodo,
            handleToggleTodo,
            handleDeleteTodo } = useTodos();

    const [openModal, setOpenModal] = useState(false);
    const [todo, setTodo] = useState({});
    useEffect(() => {
        api.defaults.headers.common['x-token'] = token;
        addTodosFirstTime();
    },[token]);
  return (
    <div className='todo-app'>  
        
        <div className='todos-container'>
            <Header nombre={ nombre }/>
            <div className='todos-add'>
                <TodoAdd handleAddTodo={ handleAddTodo }/>
            </div>

            <div className='todos-list'>
                <h3 className='text-center'>{ todos.length > 0 ? 'Tareas por hacer' : 'Aun no hay nada que hacer'}</h3>
                {
                    todos.map((todo, index) => {
                        return (
                            <TodoList
                                key={index}
                                todo={ todo }
                                handleDeleteTodo={ handleDeleteTodo }
                                setOpenModal={ setOpenModal }
                                handleToggleTodo={ handleToggleTodo }
                                setTodo={ setTodo }
                            />
                        )
                    })
                }
            </div>
        </div>
        {
            openModal && (
                <TodoUpdate 
                    todo={ todo }
                    handleUpdateTodo={ handleUpdateTodo }
                    setOpenModal={ setOpenModal }
                />
            )
        }
    </div>
  )
}
