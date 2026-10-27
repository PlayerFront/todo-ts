import { describe, it, expect } from 'vitest'
import { filterTasks } from './filterTasks'
import type { Task } from '../types/task'

const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', done: false},
    { id: '2', title: 'Task 2', done: true},
    { id: '3', title: 'Task 3', done: false},
]

describe('filterTasks', () => {
    it('returns all tasks when filter is ALL', () => {
        const result = filterTasks(mockTasks, 'all')
        expect(result).toHaveLength(3)
    })

    it('returns only completes when filter is COMPLETED', () => {
        const result = filterTasks(mockTasks, 'completed')
        expect(result).toHaveLength(1)
        expect(result[0]!.title).toBe('Task 2')
    })

    it('returns only incomplete when filter is INCOMPLETE', () => {
        const result = filterTasks(mockTasks, 'incomplete')
        expect(result).toHaveLength(2)
        expect(result.every((t) => !t.done)).toBe(true)
    })

    it('returns empty array when no tasks match', () => {
        const emptyTasks: Task[] = []
        expect(filterTasks(emptyTasks, 'completed')).toHaveLength(0)
    })
})