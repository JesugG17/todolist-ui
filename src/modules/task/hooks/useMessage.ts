import { useTasksStore } from "../../../store/task/taskStore"

export const useMessage = () => {
    const { tasks } = useTasksStore();

    const tasksCompleted = tasks.filter(tasks => tasks.completed).length;

    const message = tasksCompleted === 1 
                    ? 'Are you sure about delete this task?'
                    : `Are you sure about delete this ${ tasksCompleted } tasks?`;
    
    return message;
            
}
