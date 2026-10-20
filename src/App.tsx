import './App.css';
import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, Filter } from './types/task';
import plusIcon from './assets/icons/Plus.svg';
import trashIcon from './assets/icons/Trash.svg';
import themeOneIcon from './assets/icons/Theme1.svg'; 

type Theme = 'theme-1' | 'theme-2' | 'theme-3';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const [theme, setTheme] = useLocalStorage<Theme>('todo-theme', 'theme-1')
  const themes: Theme[] = ['theme-1', 'theme-2', 'theme-3']

  function cycleTheme() {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex]!)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.done
    if (filter === 'incomplete') return !task.done
  })

  function handleAddTask() {
    if (!inputValue.trim()) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: inputValue.trim(),
      done: false,
    }

    setTasks([...tasks, newTask])
    setInputValue('')
  }

  function toggleTask(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    )
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  useEffect(() => {
    document.body.classList.remove('theme-1', 'theme-2', 'theme-3')
    document.body.classList.add(theme)
  }, [theme])
  return (
    <>
      <section id="todo" className='todo'>
        <div className='todo__header-wrapper'>
          <h1 className='todo__header'>To-Do List</h1>
        </div>
        <button className='todo__theme' type='button' onClick={cycleTheme}>
          <img src={themeOneIcon} alt='change theme' />
        </button>
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
                  handleAddTask()
                }
              }}
            />
            <button className='todo__plus' type='button' onClick={handleAddTask}
            >
              <img src={plusIcon} alt='add' />
            </button>
          </div>
          <select className='todo__select' value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
            <option value='all'>ALL</option>
            <option value='completed'>Completed</option>
            <option value='incomplete'>Incomplete</option>
          </select>
        </div>

        <div className='todo__list'>
          <ul className='todo__items'>
            {filteredTasks.map((task) => (
              <li className='todo__item' key={task.id}>
                <span className={`todo__text ${task.done ? 'todo__text--done' : ''}`}>{task.title}</span>
                <div className='todo__buttons'>
                  <label className='todo__checkbox'>
                    <input className='todo__checkbox-input' type='checkbox' checked={task.done} onChange={() => toggleTask(task.id)}/>
                    <span className='todo__checkbox-custom' />
                  </label>
                  <button className='todo__remove' type='button' onClick={() => deleteTask(task.id)}>
                    <img src={trashIcon} alt='remove task' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default App

// TODO: сделать анимацию зачеркивания дела
//TODO: когда увеличивается список задач растягивается картинка фона