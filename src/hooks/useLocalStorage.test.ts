import { beforeEach, it, describe, expect } from "vitest";
import { useLocalStorage } from "./useLocalStorage";
import { renderHook, act } from '@testing-library/react'

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('returns initial value when nothing in storage', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
        expect(result.current[0]).toBe('initial')
    })

    it('returns stored value when storage has data', () => {
        localStorage.setItem('test-key', JSON.stringify('stored'))
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
        expect(result.current[0]).toBe('stored')
    })

    it('update state and saves to localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))


        act(() => {
            result.current[1]('new value')
        })

        expect(result.current[0]).toBe('new value')
        expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new value'))
    })
})