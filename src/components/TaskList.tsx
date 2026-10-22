import type { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[],
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
    return (
        <ul className='todo__items'>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    )
}