import './Grid.css';

import { useMemo } from 'react';

import { getLetterClass } from './App';

export interface GridProps {
    guesses: Array<string>;
    currentGuess: string
}

const Grid: React.FC<GridProps> = ({ guesses, currentGuess}): JSX.Element => {
    const GUESSES = 6
    const LETTERS = 5
    const emptyCells = useMemo(() => {
        return GUESSES*LETTERS 
            - guesses.join('').length 
            - currentGuess.length
        }, 
        [currentGuess, guesses])

    return (
        <div className='parent'>
            {!!(guesses.length) && 
                guesses.flatMap(guess => guess.split('').map((letter, index) => <div key={letter+index} className={`cell ${getLetterClass(letter, index)}`}>{letter}</div>))}
            {(guesses.length < GUESSES) &&
                currentGuess.split('').map(letter => <div className='cell'>{letter}</div>)
            }
            {Array.from({length: emptyCells}).map(() => <div className='cell'></div>)}
        </div>
    )
}

export default Grid