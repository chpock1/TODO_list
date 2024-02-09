import BaseCacheManager from "@/libs/casheManager/BaseCacheManager";
import type {ITaskItem} from "@/Interface/ITaskItem";

export default class TaskListCacheManager extends BaseCacheManager {
    private static key = this.CONF.taskList;

    static setList(value: ITaskItem[]): boolean {
        return this.set(value, this.key);
    }
    static getList(): ITaskItem[]|null {
        return this.get(this.key);
    }
}