import React, { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
const cardImages = [
        { "src": "/img/helmet-1.png" , matched: false},
        { "src": "/img/potion-1.png" , matched: false},
        { "src": "/img/ring-1.png" , matched: false},
        { "src": "/img/scroll-1.png" , matched: false},
        { "src": "/img/shield-1.png" , matched: false},  
        { "src": "/img/sword-1.png" , matched: false}
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)  
  const [disabled, setDisabled] = useState(null)
  // sound effects
  let flipsound = new Audio('/sound/flipcard-91468.mp3')
  let samecardsound = new Audio('/sound/success-1-6297.mp3')
  let boyahsound = new Audio('/sound/success-fanfare-trumpets-6185.mp3')
  let differentcardsound = new Audio('/sound/game-over-arcade-6435.mp3')
  let gamestartsound = new Audio('/sound/game-start-6104.mp3')
  // suffle cards
  const shuffleCards = ()=>{
    gamestartsound.play();
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=> ({...card, id: Math.random()}))
    setCards(shuffledCards)
    setTurns(0)
  }
  //handle a choice
  const handleChoice = (card)=>{
       flipsound.play();
       choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  // compare 2 selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
        samecardsound.play();
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return{...card, matched: true}
              
            }else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
      differentcardsound.play();
       setTimeout(() => {
        resetTurn()
       }, 1000); 
      }
    }
  }, [choiceOne,choiceTwo])

  //reset choices & increase turn
  const resetTurn = ()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }
  // starting the automaticaly
  useEffect(() => {
    shuffleCards()
  
  }, [])
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <p>This game is developed by <a href="http://nirbhay.mooo.com">Nirbhay.com</a></p>
    </div>
  )
}

export default App
