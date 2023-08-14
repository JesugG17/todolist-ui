import { useEffect, useState } from 'react';
import { useTasksStore } from "../../../store/task/taskStore";
import { Filter, TasksProperties } from "../types/filter.interface";
import { useAuthUserStore } from '../../../store/auth/authUserStore';

export const useTasks = () => {
    const [filter, setFilter] = useState<Filter>({
        all: true
    });

    const { logout } = useAuthUserStore();

    const { 
        tasks, 
        initTasks,
        tokenExpired,
        addTask,
        clearCompleted 
    } = useTasksStore();

    const filterTasks = (filter: Filter) => {
        if (filter.all) return tasks;

        return tasks.filter(task => task[filter.type as TasksProperties] === filter.value);
    }

    useEffect(() => {
        try {
            initTasks();
        } catch (error) {
            logout();
        }
    }, []);

    const filteredTasks = filterTasks(filter);

    return {
        tasks: filteredTasks,
        itemsLeft: filteredTasks.length,
        filter,
        tokenExpired,
        addTask,
        clearCompleted,
        setFilter
    }
}
