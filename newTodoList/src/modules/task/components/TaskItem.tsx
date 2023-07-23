import { FC } from 'react';
import { useTasksStore } from '../../../store/task/taskStore';
import { Completed, Cross } from '../../ui/Icons';
import { Task } from '../types/task.interface';
import { handleDeleteTask } from '../utils/display-alert-message';

export const TaskItem: FC<Props> = ({
    task, index, onDragStart, onDragOver, onDrop
}) => {

    const { toggleTask, deleteTask } = useTasksStore();

    
  return (
    <li
      className="p-4 text-xs md:text-sm cursor-pointer w-full"
      key={task.taskId}
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragOver(index)}
      onDragEnd={onDrop}
      draggable
    >
      <div className="flex justify-between">
        <div className="flex w-3/4 gap-2 items-center overflow-hidden">
          <button
            onClick={() => toggleTask(task.taskId)}
            className="border-2  border-gray-500 border-opacity-30 rounded-full flex justify-center items-center w-5 h-5 lg:w-6 lg:h-6 xl:h-8 xl:w-8"
          >
            {task.completed && <Completed />}
          </button>
          <textarea
            disabled
            defaultValue={task.description}
            className={`bg-transparent resize-none w-full text-xs md:text-lg lg:text-xl text-slate-400 font-medium focus:outline-none select-all transition-all duration-200 ${task.completed && "line-through opacity-25"}`}
          />
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
