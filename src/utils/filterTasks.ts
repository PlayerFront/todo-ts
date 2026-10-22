import type { Task, Filter } from "../types/task";

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
    if (filter === 'all') return tasks
    if (filter === 'completed') return tasks.filter((task) => task.done)
    return tasks.filter((task) => !task.done)
}