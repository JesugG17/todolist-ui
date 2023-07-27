import { create } from 'zustand';
import { taskApi } from '../../api/taskApi';
import { TasksReponse } from '../../modules/task/types/taskResponse';
import { toast } from 'react-hot-toast';
import { Task } from '../../modules/task/types/task.interface';
import { persist } from 'zustand/middleware';

interface Store {
    tasks: Task[],
    isLoading: boolean;
    itemsLeft: number;
    initTasks: () => Promise<void>;
    addTask: (description: string) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    toggleTask: (taskId: string) => Promise<void>;
    updateTask: (taskId: string, newDescription: string) => Promise<void>;
    clearCompleted: () => Promise<void>;
    setTasks: (tasks: Task[]) => void;
    setIsLoading: () => void;
}

export const useTasksStore = create<Store>()(persist((set, get) => ({
    tasks: [],
    isLoading: false,
    itemsLeft: 0, 
    initTasks: async() => {
        const { data } = await taskApi.get<TasksReponse>('/all');

        if (data.code === 200) {
            const itemsLeft = data.data.filter( task => !task.completed ).length;
            set({ tasks: data.data, isLoading: false, itemsLeft });
        }

    },
    addTask: async(description: string) => {
        const { tasks, itemsLeft } = get();
        const { data } = await taskApi.post<TasksReponse>('/create', {
            description
        });

        if (data.code === 201) {
            toast.success(data.message, {position: 'bottom-center'});
            const newTasks = [...tasks, data.data] as Task[];
            set({ tasks: newTasks, itemsLeft: itemsLeft + 1 });
        }
    },
    deleteTask: async(taskId: string) => {
        const { tasks, itemsLeft } = get();
        const { data } = await taskApi.delete<TasksReponse>(`/delete/${taskId}`);

        if (data.code === 200) {
            toast.success(data.message, {position: 'bottom-center'})
            const newTasks = tasks.filter( task => task.taskid !== taskId );
            set({ tasks: newTasks, itemsLeft: itemsLeft - 1 })
        }
        
    },
    toggleTask: async(taskId: string)  => {
        const { tasks } = get();
        console.log(taskId);

        const copyTasks = [...tasks];
        const index = copyTasks.findIndex( task => task.taskid === taskId );
        copyTasks[index] = {
            ...copyTasks[index],
            completed: !copyTasks[index].completed
        };
        await taskApi.put<TasksReponse>(`/update/${taskId}`,  {
            completed: copyTasks[index].completed 
        });

        set({ tasks: copyTasks });

    },
    updateTask: async(taskId: string, newDescription: string) => {
        const { tasks } = get();

        const { data } = await taskApi.put<TasksReponse>(`/update/${taskId}`, {
            description: newDescription
        });

        const newTasks = tasks.map( task => {
            if (task.taskid === taskId) {
                return {
                    ...task,
                    description: newDescription
                };
            }
            return task;
        }); 

        if (data.code === 200) {
            toast.success(data.message);
            set({
                tasks: newTasks
            })
        }

        if (data.code >= 400) {
            toast.error(data.message);
        }
    },
    clearCompleted: async() => {
        const { tasks, itemsLeft } = get();

        const tasksIdsToDelete = tasks.filter( task => task.completed)
                                      .map( task => task.taskid);
        
        if (tasksIdsToDelete.length === 0) return;

        const newTasks = tasks.filter( task => !task.completed);

        const { data } = await taskApi.delete<TasksReponse>('/delete', {
            data: { tasks: tasksIdsToDelete }
        });

        console.log(data);

        const newItemsLeft = itemsLeft - tasksIdsToDelete.length;

        if (data.code === 200) {
            toast.success(data.message, {position:  'bottom-center'});
            set({
                tasks: newTasks,
                itemsLeft: newItemsLeft
            });
        }
        
    },
    setTasks: (tasks: Task[]) => {
        set({ tasks });
    },
    setIsLoading: () => {
        set({ isLoading: true });
    }
}), {name: 'taskStore'}));