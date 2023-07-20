import { useState } from 'react';
import { Completed, Cross } from '../../ui/Icons';
import { useIsMobile } from '../hooks/useIsMobile';

interface Todo {
  todoId: number;
  description: string;
  completed: boolean;
}

const fakeTodos: Todo[] = [
  {
    todoId: 1,
    description: 'Complete thisa application',
    completed: false
  },
  {
    todoId: 3,
    description: 'Complete thisa application',
    completed: false
  },
  {
    todoId: 2,
    description: 'Complete thisa application',
    completed: false
  },

]

export const TaskPage = () => {

  const isMobile = useIsMobile();
  const [todos, setTodos] = useState(fakeTodos);

  const handleCompleted = (todoId: number) => {
    const newTodos = todos.map( todo => {
      if (todo.todoId === todoId) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo;
    });

    setTodos(newTodos);
  }

  const itemsLeft = fakeTodos.filter( todo => !todo.completed).length;

  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">
      <header className="lg:h-1/4">
        <img className="w-full lg:h-60" src={`/img/bg-${ isMobile ? 'mobile' : 'desktop'}-dark.jpg`} alt="" />
      </header>
      <main className='absolute top-8 lg:top-16 w-3/4 md:w-2/4 lg:w-2/5 xl:w-1/4 text-white self-center flex flex-col gap-5'>
        <h1 className='text-2xl md:text-3xl'>T O D O</h1>
        <input className='bg-secondary rounded p-4 text-xs md:text-sm focus:outline-none text-slate-400 placeholder:text-gray-600' type="text" placeholder='Create new todo...'/>

        <div className='bg-secondary rounded'>
          <ul className='divide-y-2 divide-slate-700'>
              {
                todos.map( todo => (
                  <li
                    className='p-4 text-xs md:text-sm'
                    key={todo.todoId}
                  >
                    <div className='flex justify-between'>
                      <div className='flex gap-2 items-center'>
                        <button onClick={() => handleCompleted(todo.todoId)} className='border-2  border-gray-500 border-opacity-30 rounded-full flex justify-center items-center w-5 h-5 lg:w-6 lg:h-6'>
                            {
                              todo.completed &&
                              ( <Completed /> )
                            }
                        </button>
                        <input className='bg-transparent text-slate-400 font-medium focus:outline-none' type="text" value={todo.description}/>
                      </div>
                      <button>
                        <Cross />
                      </button>
                    </div>
                  </li>
                ))
              }
              <div className='p-4 text-xs md:text-sm text-gray-500 flex justify-between'>
                <p>{ itemsLeft } items left</p>
                <button>Clear completed</button>
              </div>
          </ul>
        </div>
        <footer className='bg-secondary p-3 text-primary font-bold flex justify-center gap-5'>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </footer>
      </main>
    </div>
  )
}
