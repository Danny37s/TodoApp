export type TaskType = {
  TaskID: number;
  TaskTitle: string;
  TaskDescription: string;
  Important: number;
  isDone: boolean;
};

export type TaskPayloadType = {
  taskId: number;
  userId: number;
  taskTitle: string;
  taskDescription: string;
  important: number;
  isDone: boolean;
};

export type TaskDeletePayloadType = {
  userId:number,
  taslId:number
}