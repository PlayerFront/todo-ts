import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskItem } from './TaskItem'
import type { Task } from '../types/task'

const mockTask: Task = {
    id: 'task-1',
    title: 'купить молоко',
    done: false,
}

describe('TaskItem', () => {
    it('renders task title', () => {
        render(
            <TaskItem
                task={mockTask}
                onToggle={vi.fn()}
                onDelete={vi.fn()}
            />
        )
        expect(screen.getByText('купить молоко')).toBeInTheDocument()
    })

    it('calls onToggle with task id when checkbox clicked', async () => {
        const onToggle = vi.fn()
        render(
            <TaskItem
                task={mockTask}
                onToggle={onToggle}
                onDelete={vi.fn()}
            />
        )

        await userEvent.click(screen.getByRole('checkbox'))
        expect(onToggle).toHaveBeenNthCalledWith(1, 'task-1')
    })

    it('calls onDelete with task id when delete button checked', async () => {
        const onDelete = vi.fn()
        render(
            <TaskItem
                task={mockTask}
                onToggle={vi.fn()}
                onDelete={onDelete}
            />
        )

        await userEvent.click(screen.getByRole('button'))
        expect(onDelete).toHaveBeenNthCalledWith(1, 'task-1')
    })

    it('shows checkbox as checked when task is done', () => {
        const doneTask: Task = { ...mockTask, done: true }
        render(
            <TaskItem
                task={doneTask}
                onToggle={vi.fn()}
                onDelete={vi.fn()}
            />
        )

        expect(screen.getByRole('checkbox')).toBeChecked()
    })
})