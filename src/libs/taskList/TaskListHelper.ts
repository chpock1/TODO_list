import type {ITaskItem}     from "@/Interface/ITaskItem";
import type {TTaskStatus}   from "@/Interface/TTaskStatus";
import type {TTaskCategory} from "@/Interface/TTaskCategory";
import type {ITaskCategorySetting} from "@/Interface/ITaskCategorySetting";

export function getCountTaskByType(taskList: ITaskItem[]) {
    const count: Record<TTaskStatus, number> = {
        done: 0,
        progress: 0,
        hold: 0,
    }
    taskList.forEach(task => {
        count[task.status] += 1;
    })
    return count;
}

export const taskStatusList: Record<TTaskStatus, string> = {
    done:  'Закрытые',
    progress:  'В процессе',
    hold:  'Нужно сделать',
}

export const taskCategoryList: Record<TTaskCategory, ITaskCategorySetting> = {
    design: {
        label: 'Дизайн',
        value: 'design',
        color_code: 'task-blue',
    },
    testing: {
        label: 'Тестирование',
        value: 'testing',
        color_code: 'task-green',
    },
    development: {
        label: 'Разработка',
        value: 'development',
        color_code: 'task-orange',
    },
}
