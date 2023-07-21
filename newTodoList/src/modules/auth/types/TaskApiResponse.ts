import { Todo } from "../../task/types/todo.interface";

export interface TaskApi {
    data: Todo[],
    messages: string[];
    code: number;
}