import { create } from 'zustand';
import { taskApi } from '../../api/taskApi';
import { TasksReponse } from '../../modules/task/types/taskResponse';
import { toast } from 'react-hot-toast';
import { Task } from '../../modules/task/types/task.interface';

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

export const useTasksStore = create<Store>((set, get) => ({
    tasks: [],
    isLoading: false,
    itemsLeft: 0, 
    initTasks: async() => {
        const { data } = await taskApi.get<TasksReponse>('/all');

        if (data.code === 200) {
            const itemsLeft = data.data.filter( task => task.completed ).length;
            set({ tasks: data.data, isLoading: false, itemsLeft });
        }

    },
    addTask: async(description: string) => {
        const { tasks } = get();
        const { data } = await taskApi.post<TasksReponse>('/create', {
            description
        });

        console.log(data);

        if (data.code === 201) {
            toast.success(data.message, {position: 'bottom-center'});
            const newTasks = [...tasks, data.data] as Task[];
            set({ tasks: newTasks });
        }
    },
    deleteTask: async(taskId: string) => {
        const { tasks } = get();
        const { data } = await taskApi.delete<TasksReponse>(`/delete/${taskId}`);

        if (data.code === 200) {
            toast.success(data.message, {position: 'bottom-center'})
            const newTasks = tasks.filter( task => task.taskId !== taskId );
            set({ tasks: newTasks })
        }
        
    },
    toggleTask: async(taskId: string)  => {
        const { tasks } = get();

        const copyTasks = [...tasks];
        const index = copyTasks.findIndex( task => task.taskId === taskId );
        copyTasks[index] = {
            ...copyTasks[index],
            completed: !copyTasks[index].completed
        };

        const itemsLeft = copyTasks.filter( task => !task.completed).length;

        set({ tasks: copyTasks, itemsLeft });

    },
    updateTask: async(taskId: string, newDescription: string) => {

    },
    clearCompleted: async() => {
        const { tasks } = get();

        const tasksIdsToDelete = tasks.filter( task => task.completed)
                                      .map( task => task.taskId);
        
        if (tasksIdsToDelete.length === 0) return;

        const newTasks = tasks.filter( task => !task.completed);

        const { data } = await taskApi.delete<TasksReponse>('/delete', {
            data: { tasks: tasksIdsToDelete }
        });

        console.log(data);

        if (data.code === 200) {
            toast.success(data.message, {position:  'bottom-center'});
            set({
                tasks: newTasks
            });
        }
        
    },
    setTasks: (tasks: Task[]) => {
        set({ tasks });
    },
    setIsLoading: () => {
        set({ isLoading: true });
    }
}));