import { useRef, useState } from 'react';
import { Todo } from '../pages/TaskPage';
const fakeTodos: Todo[] = [
    {
      todoId: 1,
      description: 'Todo 1',
      completed: false
    },
    {
      todoId: 3,
      description: 'Todo 2',
      completed: false
    },
    {
      todoId: 2,
      description: 'Todo 3',
      completed: false
    },
  
  ]


export const useDrag = () => {
    const [todos, setTodos] = useState(fakeTodos);
    const dragStartItemRef = useRef<number | null>();
    const dragOverItemRef = useRef<number | null>();

    const onDragStart = (index: number) => {
        dragStartItemRef.current = index;
    }

    const onDragOver = (index: number) => {
        dragOverItemRef.current = index;
    }

    const onDrop = () => {
        const copyTodos = [...todos];
        const indexOverItem = dragOverItemRef.current as number;
        const indextStartItem = dragStartItemRef.current as number;
    
        const dragStartContent = copyTodos[indextStartItem];
        const dragEndContent = copyTodos[indexOverItem];
        copyTodos.splice(indexOverItem, 1, dragStartContent);
        copyTodos.splice(indextStartItem, 1, dragEndContent);
    
        setTodos(copyTodos);
    }

    return {
        todos,
        setTodos,
        onDragStart,
        onDragOver,
        onDrop
    }

}
