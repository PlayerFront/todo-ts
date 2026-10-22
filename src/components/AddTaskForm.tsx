import { useState } from "react";
import type { Filter } from '../types/task';
import plusIcon from '../assets/icons/Plus.svg';

interface AddTaskFormProps {
    onAdd: (title: string) => void
    filter: Filter
    onFilterChange: (filter: Filter) => void
}

export function AddTaskForm({ onAdd, filter, onFilterChange }: AddTaskFormProps) {
    const [inputValue, setInputValue] = useState('');

    function handleSubmit() {
        if (!inputValue.trim()) return
        onAdd(inputValue.trim())
        setInputValue('')
    }

    return (
        <div className='todo__add'>
            <div className='todo__add-container'>
                <input
                    className='todo__input'
                    placeholder='Add task'
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit()
                        }
                    }}
                />
                <button className='todo__plus' type='button' onClick={handleSubmit}
                >
                    <img src={plusIcon} alt='add' />
                </button>
            </div>
            <select
                className='todo__select'
                value={filter}
                onChange={(e) => onFilterChange(e.target.value as Filter)}
            >
                <option value='all' className='todo__select-value'>All</option>
                <option value='completed'>Completed</option>
                <option value='incomplete'>Incomplete</option>
            </select>
        </div>
    )
}