import { Completed, Cross } from '../../ui/Icons';
import { useIsMobile } from '../hooks/useIsMobile';
import { useDrag } from '../hooks/useDrag';

export interface Todo {
  todoId: number;
  description: string;
  completed: boolean;
}

export const TaskPage = () => {

  const isMobile = useIsMobile();
  const { todos, setTodos, onDragStart, onDragOver,  onDrop } = useDrag();
 

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


  const itemsLeft = todos.filter( todo => !todo.completed).length;

  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">
      <header className="lg:h-1/4">
        <img className="w-full lg:h-60" src={`/img/bg-${ isMobile ? 'mobile' : 'desktop'}-dark.jpg`} alt="" />
      </header>
      <main className='absolute top-8 lg:top-16 w-3/4 md:w-2/4 lg:w-2/5 xl:w-1/4 text-white self-center flex flex-col gap-5'>
        <h1 className='text-2xl md:text-3xl'>T O D O</h1>
        <input className='bg-secondary rounded p-4 text-xs md:text-sm focus:outline-none text-slate-400 placeholder:text-gray-600' type="text" placeholder='Create new todo...'/>

        <div className='bg-secondary rounded shadow-lg'>
          <ul className='divide-y-2 divide-slate-700'>
              {
                todos.map( (todo, index) => (
                  <li
                    className='p-4 text-xs md:text-sm cursor-pointer w-full'
                    key={todo.todoId}
                    onDragStart={() => onDragStart(index)}
                    onDragEnter={() => onDragOver(index)}
                    onDragEnd={onDrop}
                    draggable
                  >
                    <div className='flex justify-between'>
                      <div className='flex gap-2 items-center'>
                        <button onClick={() => handleCompleted(todo.todoId)} className='border-2  border-gray-500 border-opacity-30 rounded-full flex justify-center items-center w-5 h-5 lg:w-6 lg:h-6'>
                            {
                              todo.completed &&
                              ( <Completed /> )
                            }
                        </button>
                        <input 
                          onClick={() => console.log('doble click')} 
                          className={`bg-transparent text-slate-400 font-medium focus:outline-none select-all transition-all duration-200 ${ todo.completed && 'line-through opacity-25'}`} 
                          type="text"
                          disabled={ todo.completed } 
                          value={todo.description}/>
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
        <div className='bg-secondary p-3 text-primary font-bold flex justify-center gap-5'>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <footer className='text-center text-gray-600'>
          <p>Drag and over to reorder list!</p>
        </footer>
      </main>
    </div>
  )
}
