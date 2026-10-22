import type { Task } from "../types/task";
import trashIcon from '../assets/icons/Trash.svg';

interface TaskItemsProps {
    task: Task
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemsProps) {
    return (
            <li className='todo__item'>
        <span className={`todo__text ${task.done ? 'todo__text--done' : ''}`}>{task.title}</span>
        <div className='todo__buttons'>
            <label className='todo__checkbox'>
                <input
                    className='todo__checkbox-input'
                    type='checkbox'
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                />
                <span className='todo__checkbox-custom' />
            </label>
            <button
                className='todo__remove'
                type='button'
                onClick={() => onDelete(task.id)}>
                <img src={trashIcon} alt='remove task' />
            </button>
        </div>
    </li>
    )
}
