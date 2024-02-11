import type {TTaskStatus} from "@/Interface/TTaskStatus";
import type {TTaskCategory} from "@/Interface/TTaskCategory";

export interface ITaskItem {
    id: number,
    name: string,
    description: string,
    status: TTaskStatus,
    category: TTaskCategory|null,
    checked: boolean,
}