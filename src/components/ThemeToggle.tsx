import type { Theme } from '../types/task';
import themeOneIcon from '../assets/icons/Theme1.svg';
import themeTwoIcon from '../assets/icons/Theme2.svg';
import themeThreeIcon from '../assets/icons/Theme3.svg';

const themeIcons: Record<Theme, string> = {
    'theme-1': themeOneIcon,
    'theme-2': themeTwoIcon,
    'theme-3': themeThreeIcon,
}

interface ThemeToggleProps {
    theme: Theme
    onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
    return (
        <button className='todo__theme' type='button' onClick={onToggle}>
            <img src={themeIcons[theme]} alt='change theme' />
        </button>
    )
}