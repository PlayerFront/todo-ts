import { useState, useRef, useEffect } from "react"
import type { Filter } from '../types/task'
import chevronDownIcon from '../assets/icons/ChevronDown.svg'
import chevronUpIcon from '../assets/icons/ChevronUp.svg'

interface Option {
    value: Filter
    label: string
}

interface CustomSelectProps {
    value: Filter
    onChange: (value: Filter) => void
    options: Option[]
}

export function CustomSelect({ value, onChange, options}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null) //объяснить что значит

    const currentOption = options.find((opt) => opt.value === value)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div className="custom-select" ref={selectRef}>
            <button
                type="button"
                className={`custom-select__trigger ${isOpen ? 'custom-select__trigger--open' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {currentOption?.label}
                <img
                    src={isOpen ? chevronUpIcon : chevronDownIcon}
                    alt={isOpen ? 'close options' : 'open options'}
                    className="custom-select__icon"
                 />
            </button>

            {isOpen && (
                <ul className="custom-select__options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`custom-select__option ${option.value === value ? 'custom-select__option--selected' : ''}`}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}