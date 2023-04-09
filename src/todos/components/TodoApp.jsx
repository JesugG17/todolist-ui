import { useContext, useEffect } from'react';
import { TodoList } from './TodoList';
import { useTodos } from '../hooks/useTodos';
import { TodoAdd } from './TodoAdd';
import { AuthContext } from '../../auth';

export const TodoApp = () => {

    const { todos,
            addTodosFirstTime,
            handleAddTodo,
            handleDeleteTodo } = useTodos();

    useEffect(() => {
        addTodosFirstTime();
    },[]);

  return (
    <>  
        <div className='row'>

            <div className='col-5'>
                <TodoAdd handleAddTodo={ handleAddTodo }/>
            </div>

            <div className='col-7'>
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
    
    </>
  )
}
