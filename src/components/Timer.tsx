import './Timer.css';
import { useState, useEffect, useRef } from "react";
import playIcon from '../assets/icons/Play.svg';
import pauseIcon from '../assets/icons/Pause.svg';
import resetIcon from '../assets/icons/Reset.svg';
import trebleClefIcon from '../assets/icons/TrebleClef.svg';

type Icon = 'play' | 'pause'

const timerIcons: Record<Icon, string> = {
    'play': playIcon,
    'pause': pauseIcon,
}

interface TimerProps {
    onBack: () => void
}

export function Timer({ onBack }: TimerProps) {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isMusicPlaying, setIsMusicPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (!isRunning) return
        const intervalId = setInterval(() => {
            setSeconds((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [isRunning])

    function toggleTimer() {
        setIsRunning((prev) => !prev)
    }

    function resetTimer() {
        setSeconds(0)
        setIsRunning(false)
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        if (isMusicPlaying) {
            audio.play().catch((error) => {
                console.error('Не удалось воспроизвести музыку', error)
                setIsMusicPlaying(false)
            })
        } else {
            audio.pause()
        }
    }, [isMusicPlaying])

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return (
        <section className='timer'>
            <button className='timer__back' type='button' onClick={onBack}>
                <span className='timer__back-title'>BACK</span>
            </button>
            <header className='timer__header'>
                <h1 className="timer__title">POMODORO</h1>
                <audio ref={audioRef} src='/sounds/birds.mp3' />
                <button
                    className='timer__music'
                    type='button'
                    onClick={() => setIsMusicPlaying((prev) => !prev)}
                >
                    <img
                        src={trebleClefIcon}
                        className='timer__icon'
                        alt=''
                    />
                </button>
            </header>
            <div className='timer__display'>
                <div className='timer__clock'>
                    {String(minutes).padStart(2, '0')}
                    :
                    {String(remainingSeconds).padStart(2, '0')}
                </div>

                <div className='timer__controls'>
                    <button
                        className='timer__btn'
                        type='button'
                        onClick={toggleTimer}
                    >
                        <img
                            src={isRunning ? timerIcons.pause : timerIcons.play}
                            alt={isRunning ? 'pause' : 'play'}
                        />
                    </button>
                    <button
                        className='timer__btn'
                        type='button'
                        onClick={resetTimer}
                    >
                        <img src={resetIcon} alt='reset timer' />
                    </button>
                </div>
            </div>
        </section>
    )
}