import './App.css';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { filterTasks } from './utils/filterTasks';
import type { Task, Filter, Theme } from './types/task';
import { ThemeToggle } from './components/ThemeToggle';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';

const THEMES: Theme[] = ['theme-1', 'theme-2', 'theme-3']

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  const [filter, setFilter] = useLocalStorage<Filter>('todo-filter', 'all');
  const [theme, setTheme] = useLocalStorage<Theme>('todo-theme', 'theme-1')

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      done: false,
    }
    setTasks([...tasks, newTask])
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

  function cycleTheme() {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length
    setTheme(THEMES[nextIndex]!)
  }

  useEffect(() => {
    document.body.classList.remove(...THEMES)
    document.body.classList.add(theme)
  }, [theme])

  const filteredTasks = filterTasks(tasks, filter)
  return (
    <>
      <section id="todo" className='todo'>
        <header className='todo__header'>
          <h1 className='todo__title'>To-Do List</h1>
        </header>
        <ThemeToggle theme={theme} onToggle={cycleTheme} />
        <AddTaskForm
          onAdd={handleAddTask}
          filter={filter}
          onFilterChange={setFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
    </>
  )
}

export default App