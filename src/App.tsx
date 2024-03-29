import './App.css';

import { useState } from 'react';

import Grid from './Grid';
import Keyboard from './Keyboard';
import useEventListener from './useEventListener';
import words from './words.json';

const ALLOWED_GUESSES = 6
const WORD_LENGTH = 5

const dayOfYear = (date: Date) => Math.floor((date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) / 1000 / 60 / 60 / 24);

export const ANSWER = words[dayOfYear(new Date()) % words.length]

enum GameStatus {
  ONGOING,
  GAME_OVER,
}

enum LetterClasses {
  UNUSED = 'selected-unused',
  CORRECT = 'selected-correct',
  CLOSE = 'selected-close'
}

export const getLetterClass = (letter: string, index: number) => {
  if (!ANSWER.toLowerCase().includes(letter)) return LetterClasses.UNUSED
  else {
    const letters = ANSWER.toLowerCase().split('')
    const letterIndices = letters.reduce((acc: Array<number>, char: string, i: number) => char === letter ? [...acc, i] : acc, [])
    if (letterIndices.includes(index)) return LetterClasses.CORRECT
    return LetterClasses.CLOSE
  }
}

function App() {
  const [gameStatus, setGameStatus] = useState(GameStatus.ONGOING)
  const [guesses, setGuesses] = useState<Array<string>>([])
  const [currentGuess, setCurrentGuess] = useState('')

  const handleKeyDown = (key: string) => {
    if (gameStatus === GameStatus.ONGOING) {
      if (key === 'Backspace') {
        setCurrentGuess(guess => guess.slice(0, -1))
      }
      else if (key === 'Enter' && currentGuess.length === WORD_LENGTH) {
        validateGuess(currentGuess)
      }
      else if (currentGuess.length < WORD_LENGTH && key.length === 1 && key.match(/[a-zA-Z]/)) {
        setCurrentGuess(guess => (guess + key).toLowerCase())
      }
    }
  }
  useEventListener('keydown', (event) => {
    if (event instanceof KeyboardEvent) handleKeyDown(event.key)
  })
  const validateGuess = (guess: string) => {
    if (guess.toLowerCase() === ANSWER.toLowerCase()) {
      setGuesses(guesses => [...guesses, guess])
      setCurrentGuess('')
      setGameStatus(GameStatus.GAME_OVER)
      alert('You won')
    }
    else if (guesses.length < ALLOWED_GUESSES) {
      if (guesses.length === ALLOWED_GUESSES - 1) {
        alert(`The word was: ${ANSWER}`)
        setGameStatus(GameStatus.GAME_OVER)
      }
      setGuesses(guesses => [...guesses, guess])
      setCurrentGuess('')
    }
  }


  return (
    <div className="App">
      <header>
        <div>Wordle</div>
        <div className='sub'>Trent Fridey</div>
      </header>
      <main>
        <div className='grid-container'>
          <Grid guesses={guesses} currentGuess={currentGuess} />
        </div>
        <Keyboard onKeyDown={handleKeyDown} guesses={guesses} />
      </main>
    </div>
  )
}

export default App
