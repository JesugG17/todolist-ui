import { Todo } from "../../task/types/todo.interface";

export interface TaskApi {
    data: Response,
    messages: string[];
    code: number;
}

interface Response {
    user: string;
    token: string;
}