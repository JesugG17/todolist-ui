import { FC, useState, useRef, useCallback, useEffect } from 'react';
import { useTasksStore } from '../../../store/task/taskStore';
import { Completed, Cross } from '../../ui/Icons';
import { Task } from '../types/task.interface';
import { handleDeleteTask } from '../utils/display-alert-message';

export const TaskItem: FC<Props> = ({
    task, index, onDragStart, onDragOver, onDrop
}) => {

    const { toggleTask, deleteTask, updateTask } = useTasksStore();
    const taskDescriptionInputRef = useRef<HTMLInputElement>(null);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [isTaskEditing, setIsTaskEditing] = useState(false);

    const stopUpdatingTask = useCallback((event: KeyboardEvent) => {
      if (event.key === 'Escape' && isTaskEditing) {
        setIsTaskEditing(false);
        taskDescriptionInputRef.current?.blur();
        setTaskDescription(task.description);
      }

      if (event.key === 'Enter' && isTaskEditing) {
        setIsTaskEditing(false);
        taskDescriptionInputRef.current?.blur();
      }
    }, []);

    useEffect(() => {
      window.addEventListener('keyup', stopUpdatingTask);

      return () => {
        window.removeEventListener('keyup', stopUpdatingTask);
      }
    }, []);

  return (
    <li
      className="p-4 text-xs md:text-sm cursor-pointer w-full"
      key={task.taskId}
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragOver(index)}
      onDragEnd={onDrop}
      draggable
    >
      <div className="flex">
        <div className="flex flex-1 gap-2 items-center overflow-hidden">
          <button
            onClick={() => toggleTask(task.taskId)}
            className="border-2  border-gray-500 border-opacity-30 rounded-full flex justify-center items-center w-5 h-5 lg:w-6 lg:h-6 xl:h-8 xl:w-8 hover:from-blue-300 hover:to-violet-500"
          >
            {task.completed && <Completed />}
          </button>
          <form
            className='flex-1' 
            onSubmit={(event) => {
              event.preventDefault();
              if (taskDescription.length === 0) return;
              updateTask(task.taskId, taskDescription);
            }}
          >
            <input
              className={`bg-transparent w-full resize-none text-xs md:text-lg text-slate-400 font-medium focus:outline-none cursor-pointer transition-all duration-200 ${task.completed && "line-through opacity-25"}`}
              ref={taskDescriptionInputRef}
              value={taskDescription}
              disabled={task.completed}
              onChange={(event) => {
                setTaskDescription(event.target.value)
              }}
              onClick={() => setIsTaskEditing(true)}
            />
          </form>
        </div>
        <button onClick={async() => {
          const isConfirmed = await handleDeleteTask('Are you sure about delete this task?');
          if (isConfirmed) deleteTask(task.taskId);
        }}>
          <Cross />
        </button>
      </div>
    </li>
  );
};

type Props = {
    task: Task,
    index: number;
    onDragStart: (index: number) => void;
    onDragOver: (index: number) => void;
    onDrop: () => void;
}
