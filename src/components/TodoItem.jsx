import { deleteTodo, toggleCompleted } from '../store/todos-slice';
import { useDispatch } from 'react-redux';

function TodoItem({ id, text, completed }) {
  const dispatch = useDispatch()
  return (
    <div className='todo-item card'>
      <div className='todo-item-content'>
        <input id={id} type="checkbox" checked={completed} onChange={() => dispatch(toggleCompleted(id))}/>
        <label htmlFor={id}>{text}</label>
      </div>
        <button className='btn btn-del' onClick={() => dispatch(deleteTodo(id))}>Delete</button>
    </div>
  )
}

export default TodoItem