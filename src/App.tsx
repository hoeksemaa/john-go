import { useState } from "react"
import LobbyView from './LobbyView'
import GameView from './GameView'
import { type GameID } from './types'
import './App.css'

type AppView = 'lobby' | 'game'

function App() {
  const [appView, setAppView] = useState('lobby')
  const [gameID, setGameID] = useState<GameID>(null)

  //let [gameState, setGameState] = useState(createGame())

  /*
  function handleClick(position: number) {
    fetch("http://localhost:3000/move", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({positionMessage: position})
    })
      .then(response => response.json())
      .then(data => {
        setGameState(data)
      })
  }
      */

  function handleGameEnter(id: string) {
    setGameID(id)
    setAppView('game')
  }

  function handleLobbyEnter() {
    setGameID(null)
    setAppView('lobby')
  }

  /*
  function handleReset() {
    fetch("http://localhost:3000/reset", {
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        setGameState(data)
      })
  }
  */

  /*
  useEffect(() => {
    fetch("http://localhost:3000/game")
      .then(response => response.json())
      .then(data => {
        setGameState(data)
        setLoading(false)
      })
  }, [])
  */

  return (appView == 'lobby') ? 
    <LobbyView onGameEnter={handleGameEnter}/>
    : 
    <GameView gameID={gameID} onLobbyEnter={handleLobbyEnter}/>
}

export default App;