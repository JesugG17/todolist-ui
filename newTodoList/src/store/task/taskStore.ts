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
            const itemsLeft = data.data.filter( task => task.status ).length;
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
            toast.success(data.message);
            const newTasks = [...tasks, data.data] as Task[];
            set({ tasks: newTasks });
        }
    },
    deleteTask: async(taskId: string) => {
        const { tasks } = get();
        const { data } = await taskApi.delete<TasksReponse>(`/delete/${taskId}`);

        if (data.code === 200) {
            toast.success(data.message)
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
            status: !copyTasks[index].status
        };

        const itemsLeft = copyTasks.filter( task => task.status).length;

        set({ tasks: copyTasks, itemsLeft });

    },
    updateTask: async(taskId: string, newDescription: string) => {

    },
    setTasks: (tasks: Task[]) => {
        set({ tasks });
    },
    setIsLoading: () => {
        set({ isLoading: true });
    }
}));