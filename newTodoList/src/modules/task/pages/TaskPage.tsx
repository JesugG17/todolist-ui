import { Cross } from '../../ui/Icons';
import { useIsMobile } from '../hooks/useIsMobile';

const fakeTodos = [
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

  const itemsLeft = fakeTodos.filter( todo => !todo.completed).length;

  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col">
      <header className="">
        <img className="w-full object-cover" src={`/img/bg-${ isMobile ? 'mobile' : 'desktop'}-dark.jpg`} alt="" />
      </header>
      <main className='absolute top-8 w-3/4 text-white self-center flex flex-col gap-5'>
        <h1 className='text-2xl'>T O D O</h1>
        <input className='bg-secondary rounded p-4 text-xs placeholder:text-gray-600' type="text" placeholder='Create new todo...'/>

        <div className='bg-secondary rounded'>
          <ul className='divide-y-2 divide-slate-700'>
              {
                fakeTodos.map( todo => (
                  <li
                    className='p-4 text-xs'
                    key={todo.todoId}
                  >
                    <div className='flex justify-between'>
                      <div className='flex gap-2'>
                        <input type="radio" />
                        <input className='bg-transparent focus:outline-none' type="text" />
                      </div>
                      <button>
                        <Cross />
                      </button>
                    </div>
                  </li>
                ))
              }
              <div className='p-4 text-xs text-gray-500 flex justify-between'>
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
