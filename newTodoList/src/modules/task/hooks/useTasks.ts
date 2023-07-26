import { useEffect, useState } from 'react';
import { useTasksStore } from "../../../store/task/taskStore";
import { Filter, TasksProperties } from "../types/filter.interface";

export const useTasks = () => {
    const [filter, setFilter] = useState<Filter>({
        all: true
    });
    const { 
        tasks, 
        initTasks,
        addTask,
        clearCompleted 
    } = useTasksStore();

    const filterTasks = (filter: Filter) => {
        if (filter.all) return tasks;

        return tasks.filter(task => task[filter.type as TasksProperties] === filter.value);
    }

    useEffect(() => {
        initTasks();
    }, []);

    const filteredTasks = filterTasks(filter);

    return {
        tasks: filteredTasks,
        itemsLeft: filteredTasks.length,
        filter,
        addTask,
        clearCompleted,
        setFilter
    }
}
