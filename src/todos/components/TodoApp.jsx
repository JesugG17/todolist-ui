import { useContext, useEffect } from'react';
import { TodoList } from './TodoList';
import { useTodos } from '../hooks/useTodos';
import { TodoAdd } from './TodoAdd';
import { UserContext, UserProvider } from '../context/UserProvider';

export const TodoApp = () => {

    const token = useContext(UserContext);

    const { todos,
            addTodosFirstTime,
            handleAddTodo,
            handleDeleteTodo } = useTodos(token);

    useEffect(() => {
        addTodosFirstTime();
    },[]);

  return (
    <>  
        <div className="row">

            <div className="col-5">
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
