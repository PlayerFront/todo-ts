import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('Renders empty state initially', () => {
        render(<App />)
        expect(screen.getByPlaceholderText('Add task')).toBeInTheDocument()
    })

    it('Adds a new task when user types and clicks add button', async () => {
        render(<App />)
        const input = screen.getByPlaceholderText('Add task')
        await userEvent.type(input, 'Купить молоко')
        await userEvent.click(screen.getByAltText('add'))

        expect(screen.getByText('Купить молоко')).toBeInTheDocument()
    })

    it('Removes task whene delete button clicked', async () => {
        render(<App />)
        const input = screen.getByPlaceholderText('Add task')
        await userEvent.type(input, 'Купить молоко')
        await userEvent.click(screen.getByAltText('add'))

        await userEvent.click(screen.getByAltText('remove task'))
        expect(screen.queryByText('Купить молоко')).not.toBeInTheDocument()
    })

    it('Toggles task as done when checkbox clicked', async () => {
        render(<App />)
        const input = screen.getByPlaceholderText('Add task')
        await userEvent.type(input, 'Купить молоко')
        await userEvent.click(screen.getByAltText('add'))
        
        const checkbox = screen.getByRole('checkbox')
        await userEvent.click(checkbox)

        expect(checkbox).toBeChecked()
    })

    
})