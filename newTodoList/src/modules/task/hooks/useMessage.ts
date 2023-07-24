import { useTasksStore } from "../../../store/task/taskStore"

export const useMessage = () => {
    const { itemsLeft, tasks } = useTasksStore();

    const tasksCompleted = tasks.length - itemsLeft

    const message = tasksCompleted === 1 
                    ? 'Are you sure about delete this task?'
                    : `Are you sure about delete this ${ tasksCompleted } tasks?`

    return message;
            
}
