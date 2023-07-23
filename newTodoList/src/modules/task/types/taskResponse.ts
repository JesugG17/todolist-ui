import { Task } from "./task.interface";

export interface TasksReponse {
    data: Task[],
    message: string;
    code: number;
}