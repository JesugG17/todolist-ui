import { Task } from './task.interface';

export type TasksProperties = keyof Task;

export interface Filter {
  type?: TasksProperties | 'none';
  value?: boolean | 'none';
  all: boolean;
}
