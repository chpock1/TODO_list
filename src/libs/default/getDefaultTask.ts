import type {ITaskItem} from "@/Interface/ITaskItem";
import clone from "@/libs/general/DeepClone";

const task: ITaskItem = {
    id: -1,
    name: "",
    description: "",
    status: 'hold',
    category: null,
}
const getDefaultTask = () => {
    return clone(task);
}
export default getDefaultTask;