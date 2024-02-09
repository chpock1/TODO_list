import type {ITaskItem} from "@/Interface/ITaskItem";
import type {TTaskStatus} from "@/Interface/TTaskStatus";

export function getCountTaskByType(taskList: ITaskItem[]) {
    let count: Record<TTaskStatus, number> = {
        done: 0,
        progress: 0,
        hold: 0,
    }
    taskList.forEach(task => {
        count[task.status] += 1;
    })
    return count;
}