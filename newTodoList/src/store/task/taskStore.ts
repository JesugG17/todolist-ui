import { create } from 'zustand';
import { Todo } from '../../modules/task/pages/TaskPage';

interface State {
    todos: Todo[],
    loading: boolean;
    initTodos: () => Promise<void>;
    addTodo: (description: string) => Promise<void>;
    removeTodo: (todoId: number) => Promise<void>;
    toggleTodo: (todoId: number) => Promise<void>;
    updateTodo: (todoId: number, newDescription: string) => Promise<void>;
}

export const useTasksStore = create<State>((set, get) => ({
    todos: [],
    loading: false,
    initTodos: async() => {

    },
    addTodo: async(description: string) => {

    },
    removeTodo: async(todoId: number) => {

    },
    toggleTodo: async(todoId: number)  => {

    },
    updateTodo: async(todoId: number, newDescription: string) => {

    }
}));