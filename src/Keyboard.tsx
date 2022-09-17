import './Keyboard.css';

import { useMemo } from 'react';

import { getLetterClass } from './App';

const QWERTY = 'qwertyuiopasdfghjklzxcvbnm'.split('')

export default function Keyboard (props: { guesses: Array<string>, onKeyDown: (key: string) => void }) {

    const keyColors = useMemo(() => {
        const keyStates = Object.fromEntries(QWERTY.map(letter => [letter, '']))
        props.guesses.forEach(guess => {
            guess.split('').forEach((letter, index) => {
                keyStates[letter] = getLetterClass(letter, index)
            })
        })
        return keyStates
    }, [props.guesses])

    return (
        <div className='keyboard'>
            <div className='keyboard-row'>
                {QWERTY.slice(0, QWERTY.findIndex(l => l==='p')+1).map(letter => (
                    <button key={letter} className={`key ${keyColors[letter]}`} onClick={() => props.onKeyDown(letter)}>{letter}</button>
                ))}
            </div>
            <div className='keyboard-row'>
                <div style={{flex:0.5}}></div>
                {QWERTY.slice(QWERTY.findIndex(l => l==='a'), QWERTY.findIndex(l => l==='l')+1).map(letter => (
                    <button key={letter} className={`key ${keyColors[letter]}`} onClick={() => props.onKeyDown(letter)}>{letter}</button>
                ))}
                <div style={{flex:0.5}}></div>
            </div>
            <div className='keyboard-row'>
                <button onClick={() => props.onKeyDown('Enter')} className='key larger'>Enter</button>
                {QWERTY.slice(QWERTY.findIndex(l => l==='z')).map(letter => (
                    <button key={letter} className={`key ${keyColors[letter]}`} onClick={() => props.onKeyDown(letter)}>{letter}</button>
                ))}
                <button onClick={() => props.onKeyDown('Backspace')} className='key larger'>{'⌫'}</button>
            </div>
        </div>
    )
}