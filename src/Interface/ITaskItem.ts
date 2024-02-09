import type {TTaskStatus} from "@/Interface/TTaskStatus";

export interface ITaskItem {
    id: number,
    name: string,
    description: string,
    status: TTaskStatus,
}