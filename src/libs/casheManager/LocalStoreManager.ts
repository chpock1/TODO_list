const get = <T>(key: string): T|null => {
    try {
        let rawCacheItem = localStorage.getItem(key);
        if (rawCacheItem != null) {
            return  JSON.parse(rawCacheItem);
        }
    } catch (e) {
        localStorage.removeItem(key);
    }
    return null;
}
const set = (item: any, key: string): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
        return false;
    }
    return true;
}
const has = (key: string): boolean => {
    return localStorage.getItem(key) !== null;
}
const remove = (key: string): void => {
    localStorage.removeItem(key);
}

const LocalStoreManager = () => {
    return {
        get,
        set,
        has,
        remove,
    }
}

export default LocalStoreManager;