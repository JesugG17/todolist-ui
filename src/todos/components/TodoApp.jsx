import { useContext, useEffect } from 'react';
import { TodoList } from './TodoList';
import { useTodos } from '../hooks/useTodos';
import { TodoAdd } from './TodoAdd';
import { AuthContext } from '../../auth/context';
import { Header } from './Header';

export const TodoApp = () => {

    const { user: { usuario } } = useContext(AuthContext);
    const { todos,
            addTodosFirstTime,
            handleAddTodo,
            handleDeleteTodo } = useTodos();

    useEffect(() => {
        addTodosFirstTime();
    },[]);

  return (
    <div className='todo-app'>  
        
        <div className='todos-container'>
            <Header nombre={ usuario.nombre }/>
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
                            />
                        )
                    })
                }
            </div>
        </div>
    
    </div>
  )
}
