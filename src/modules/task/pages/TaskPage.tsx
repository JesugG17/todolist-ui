import { useState } from 'react';
import { useTasks, useMessage, useDrag, useIsMobile } from '../hooks';
import { Navbar, ModalProfile, TaskItem, Filters, ModalExtendSession } from '../components';
import { handleDeleteTask } from '../utils/display-alert-message';
import { useUIStore } from '../../../store/ui/uiStore';

export const TaskPage = () => {
  const { onDragStart, onDragOver, onDrop } = useDrag();
  const { tasks, itemsLeft, filter, tokenExpired, addTask, clearCompleted, setFilter } = useTasks();
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const message = useMessage();
  const isMobile = useIsMobile();

  const [taskDescription, setTaskDescription] = useState('');

  return (
    <div className='w-full h-screen bg-background flex flex-col'>
      <Navbar />
      {isModalOpen && <ModalProfile />}
      {tokenExpired && <ModalExtendSession />}
      <header className='md:h-1/4'>
        <img
          className='w-full lg:h-60'
          src={`/img/bg-${isMobile ? 'mobile' : 'desktop'}-dark.jpg`}
          alt=''
        />
      </header>
      <main className='absolute top-20 md:top-24 w-4/5 md:w-2/4 lg:w-2/5  text-white self-center flex flex-col gap-5'>
        <h2 className='text-2xl md:text-3xl font-bold'>T A S K S</h2>
        <form
          onSubmit={(event) => {
            if (taskDescription.length === 0) return;
            event.preventDefault();
            setTaskDescription('');
            addTask(taskDescription);
          }}
        >
          <input
            className='bg-secondary w-full rounded p-4 text-xs md:text-sm lg:text-xl focus:outline-none text-slate-400 placeholder:text-gray-600'
            type='text'
            placeholder='Create new todo...'
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
          />
        </form>

        <div className='bg-secondary max-h-96 overflow-y-scroll rounded shadow-lg'>
          <ul className='divide-y-2 divide-slate-700'>
            {tasks.length === 0 && (
              <span className='text-center p-10 block text-primary font-bold'>
                No tasks to show!
              </span>
            )}
            {tasks.map((task, index) => (
              <TaskItem
                key={task.taskid}
                task={task}
                index={index}
                onDragOver={onDragOver}
                onDragStart={onDragStart}
                onDrop={onDrop}
              />
            ))}
            <div className='p-4 text-xs md:text-sm text-gray-500 flex justify-between'>
              <p>{itemsLeft} items left</p>
              <button
                onClick={async () => {
                  const tasksCompleted = tasks.filter((task) => task.completed).length;
                  if (tasks.length === 0 || tasksCompleted === 0) return;

                  const isConfirmed = await handleDeleteTask(message);
                  if (isConfirmed) clearCompleted();
                }}
                className='hover:brightness-200 font-medium transition-all duration-200'
              >
                Clear completed
              </button>
            </div>
          </ul>
        </div>
        <Filters
          setFilter={setFilter}
          filter={filter}
        />
        <footer className='text-center text-gray-600'>
          <p>Drag and over to reorder list!</p>
        </footer>
      </main>
    </div>
  );
};
