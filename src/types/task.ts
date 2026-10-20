export interface Task {
    id: string
    title: string
    done: boolean
}

export type Filter = 'all' | 'completed' | 'incomplete'