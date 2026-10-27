import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTaskForm } from './AddTaskForm'

describe('AddTaskForm', () => {
    it('Calls onAdd with input value when plus button clicked', async () => {
        const onAdd = vi.fn()
        render(
            <AddTaskForm
                onAdd={onAdd}
                filter='all'
                onFilterChange={vi.fn()}
            />
        )

        const input = screen.getByPlaceholderText('Add task')
        await userEvent.type(input, 'Example 1')

        await userEvent.click(screen.getByAltText('add'))

        expect(onAdd).toHaveBeenCalledWith('Example 1')
        expect(input).toHaveValue('')
    })

    it('When input is empty onAdd does not call', async () => {
        const onAdd = vi.fn()
        render(
            <AddTaskForm
                onAdd={onAdd}
                filter='all'
                onFilterChange={vi.fn()}
            />
        )
        await userEvent.click(screen.getByAltText('add'))
        expect(onAdd).not.toHaveBeenCalled()
    })

    it('When Enter is pressed onAdd calls', async () => {
        const onAdd = vi.fn()
        render(
            <AddTaskForm
                onAdd={onAdd}
                filter='all'
                onFilterChange={vi.fn()}
            />
        )
        const input = screen.getByPlaceholderText('Add task')
        await userEvent.type(input, 'Example 1{Enter}')

        expect(onAdd).toHaveBeenCalledWith('Example 1')
    })

    it('When select value changes calls onFilterChange', async () => {
        const onFilterChange = vi.fn()
        render(
            <AddTaskForm
                onAdd={vi.fn()}
                filter='all'
                onFilterChange={onFilterChange}
            />
        )

        const select = screen.getByRole('combobox')
        await userEvent.selectOptions(select, 'completed')

        expect(onFilterChange).toHaveBeenCalledWith('completed')
    })
})