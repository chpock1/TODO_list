import type {TTaskStatus} from "@/Interface/TTaskStatus";

export interface ITaskItem {
    name: string,
    description: string,
    tags: string[],
    status: TTaskStatus,
}