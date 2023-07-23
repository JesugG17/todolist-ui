import { useRef } from 'react';
import { useTasksStore } from '../../../store/task/taskStore';


export const useDrag = () => {
    const { tasks, setTasks } = useTasksStore();
    const dragStartItemRef = useRef<number | null>();
    const dragOverItemRef = useRef<number | null>();

    const onDragStart = (index: number) => {
        dragStartItemRef.current = index;
    }

    const onDragOver = (index: number) => {
        dragOverItemRef.current = index;
    }

    const onDrop = () => {
        const copyTask = [...tasks];
        const indexOverItem = dragOverItemRef.current as number;
        const indextStartItem = dragStartItemRef.current as number;
    
        const dragStartContent = copyTask[indextStartItem];
        const dragEndContent = copyTask[indexOverItem];
        copyTask.splice(indexOverItem, 1, dragStartContent);
        copyTask.splice(indextStartItem, 1, dragEndContent);
    
        setTasks(copyTask);
    }

    return {
        tasks,
        onDragStart,
        onDragOver,
        onDrop
    }

}
