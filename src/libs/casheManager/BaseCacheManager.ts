import LocalStoreManager from "@/libs/casheManager/LocalStoreManager";


export default class BaseCacheManager {
    private static manager = LocalStoreManager();

    protected static CONF = {
        todoList: 'TODO_LIST',
    }

    protected static set(value: any, key: string): boolean {
        return this.manager.set(value, key);
    }

    protected static has(key: string): boolean {
        return BaseCacheManager.manager.has(key);
    }

    protected static get<T>(key: string): T|null {
        const cacheItem = this.manager.get<T>(key);

        if (cacheItem != null) {
            return cacheItem
        }

        return null;
    }

    protected static remove(key: string) {
        return this.manager.remove(key);
    }
}