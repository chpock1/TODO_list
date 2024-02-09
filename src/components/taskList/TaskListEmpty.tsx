
interface IProps {
    includeFilter: boolean,
}
interface IContext {
    emit: (name: 'clearFilter') => void
}

const TaskListEmpty = (props: IProps, {emit}: IContext) =>
    <div>
        <div>Список задач пустой</div>
        {props.includeFilter && <div onClick={()=>emit('clearFilter')}>Очистить фильтр</div>}
    </div>;

export default TaskListEmpty;
