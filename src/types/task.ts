export interface Task {
    id: string
    title: string
    done: boolean
}

export type Filter = 'all' | 'completed' | 'incomplete'
export type Theme = 'theme-1' | 'theme-2' | 'theme-3' 