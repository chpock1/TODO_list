
const objectDeepClone = <T>(object: T): T => {
    const clObject = {} as T;
    for(const i in object) {
        clObject[i] = clone(object[i]);
    }
    return clObject;
}

const arrayDeepClone = <T = Array<any>>(array: T) => {
    //@ts-ignore
    return array.map(a=>clone(a));
}

const clone = <T>(object: T): T => {
    if(object && object.constructor === Array) {
        return arrayDeepClone(object);
    }

    else if(object && object.constructor === Object) {
        return objectDeepClone(object);
    }

    else {
        return object;
    }
}
export default clone;