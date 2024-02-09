import BaseCacheManager from "@/libs/casheManager/BaseCacheManager";
import type {ITaskItem} from "@/Interface/ITaskItem";

export default class ToDoListCacheManager extends BaseCacheManager {
    private static key = this.CONF.todoList;

    static setList(value: ITaskItem[]): boolean {
        return this.set(value, this.key);
    }
    static getList(): ITaskItem[]|null {
        return this.get(this.key);
    }
}