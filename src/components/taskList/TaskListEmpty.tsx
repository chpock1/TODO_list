
interface IProps {
    includeFilter: boolean,
}
interface IContext {
    emit: (name: 'clearFilter') => void
}
const rootStyles = '    display: flex;\n' +
    '    flex-direction: column;\n' +
    '    width: 100%;\n' +
    '    align-items: center;\n' +
    '    margin-top: 50px;'
const clearStyles = 'cursor: pointer; color: #0560FD;';

const TaskListEmpty = (props: IProps, {emit}: IContext) =>
    <div style={rootStyles}>
        <div>Список задач пустой</div>
        {props.includeFilter && <div style={clearStyles} onClick={()=>emit('clearFilter')}>Очистить фильтр</div>}
    </div>;

export default TaskListEmpty;
