import { useEffect, useState, useRef } from 'react'
import { createGame, type GameState } from "./go"
import { type GameID } from './types'

const BOUNCE_SPEED = 3 // pixels per frame

type GameViewProps = {
    gameID: GameID,
    onLobbyEnter: () => void
}

function GameView({ gameID, onLobbyEnter } : GameViewProps) {
    const [gameState, setGameState] = useState(createGame())
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [gridColor, setGridColor] = useState('#141414')
    const gridRef = useRef<HTMLDivElement>(null)
    const headBarRef = useRef<HTMLDivElement>(null)
    const posRef = useRef({ x: 0, y: 0 })
    const velRef = useRef({ dx: BOUNCE_SPEED, dy: BOUNCE_SPEED })

    function getRandomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    async function handleMove(index: number, id: GameID) {
        const response = await fetch(`/move/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({position: index})
        })
        const data: GameState = await response.json()
        setGameState(data)
    }

    async function getGameState(id: GameID) {
        const response = await fetch(`/game/${id}`)
        const data: GameState = await response.json()
        setGameState(data)
    }

    function handleBackToLobby() {
        onLobbyEnter()
    }

    function handleBounce() {
        const newColor = getRandomColor()
        setGridColor(newColor)
        console.log('Bounce! New color:', newColor)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getGameState(gameID)
        }, 500)

        return () => {clearInterval(interval)}
    }, [])

    useEffect(() => {
        // Initialize starting position
        if (headBarRef.current && gridRef.current) {
            const headBarRect = headBarRef.current.getBoundingClientRect()
            const gridRect = gridRef.current.getBoundingClientRect()
            posRef.current = {
                x: window.innerWidth / 2 - gridRect.width / 2,
                y: headBarRect.bottom + 20
            }
            setPosition(posRef.current)
        }

        let animationFrameId: number

        const animate = () => {
            const gridRect = gridRef.current?.getBoundingClientRect()
            const headBarRect = headBarRef.current?.getBoundingClientRect()

            if (!gridRect || !headBarRect) {
                animationFrameId = requestAnimationFrame(animate)
                return
            }

            // Calculate new position
            let newX = posRef.current.x + velRef.current.dx
            let newY = posRef.current.y + velRef.current.dy
            let bounced = false

            // Left edge collision
            if (newX <= 0) {
                newX = 0
                velRef.current.dx = Math.abs(velRef.current.dx)
                bounced = true
            }

            // Right edge collision
            if (newX + gridRect.width >= window.innerWidth) {
                newX = window.innerWidth - gridRect.width
                velRef.current.dx = -Math.abs(velRef.current.dx)
                bounced = true
            }

            // Top edge collision (headBar bottom, not window top)
            if (newY <= headBarRect.bottom) {
                newY = headBarRect.bottom
                velRef.current.dy = Math.abs(velRef.current.dy)
                bounced = true
            }

            // Bottom edge collision
            if (newY + gridRect.height >= window.innerHeight) {
                newY = window.innerHeight - gridRect.height
                velRef.current.dy = -Math.abs(velRef.current.dy)
                bounced = true
            }

            if (bounced) {
                handleBounce()
            }

            // Update position ref and state
            posRef.current = { x: newX, y: newY }
            setPosition({ x: newX, y: newY })

            animationFrameId = requestAnimationFrame(animate)
        }

        // Start animation after short delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate)
        }, 100)

        return () => {
            clearTimeout(timeoutId)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    useEffect(() => {
        function handleResize() {
            if (gridRef.current && headBarRef.current) {
                const gridRect = gridRef.current.getBoundingClientRect()
                const headBarRect = headBarRef.current.getBoundingClientRect()

                setPosition(prev => {
                    let newX = Math.max(0, Math.min(prev.x, window.innerWidth - gridRect.width))
                    let newY = Math.max(headBarRect.bottom, Math.min(prev.y, window.innerHeight - gridRect.height))
                    return { x: newX, y: newY }
                })
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            <div className="headBar" ref={headBarRef}>
                <h1>
                    Game {gameState.id.slice(0, 3)}
                </h1>
                <div className="gameControls">
                    <div className="info">
                        <p>current player: {gameState.currentPlayer}</p>
                        <p>winner: {gameState.winner ? gameState.winner : "none"}</p>
                    </div>
                    <div className='buttonDiv'>
                        <button onClick={handleBackToLobby}>Back to Lobby</button>
                    </div>
                </div>
            </div>
            <div
                className="grid"
                ref={gridRef}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    backgroundColor: gridColor
                }}
            >
                <p className="cell" onClick={() => handleMove(0, gameID)} style={{ color: gridColor }}>{gameState.board[0]}</p>
                <p className="cell" onClick={() => handleMove(1, gameID)} style={{ color: gridColor }}>{gameState.board[1]}</p>
                <p className="cell" onClick={() => handleMove(2, gameID)} style={{ color: gridColor }}>{gameState.board[2]}</p>
                <p className="cell" onClick={() => handleMove(3, gameID)} style={{ color: gridColor }}>{gameState.board[3]}</p>
                <p className="cell" onClick={() => handleMove(4, gameID)} style={{ color: gridColor }}>{gameState.board[4]}</p>
                <p className="cell" onClick={() => handleMove(5, gameID)} style={{ color: gridColor }}>{gameState.board[5]}</p>
                <p className="cell" onClick={() => handleMove(6, gameID)} style={{ color: gridColor }}>{gameState.board[6]}</p>
                <p className="cell" onClick={() => handleMove(7, gameID)} style={{ color: gridColor }}>{gameState.board[7]}</p>
                <p className="cell" onClick={() => handleMove(8, gameID)} style={{ color: gridColor }}>{gameState.board[8]}</p>
            </div>
            
        </>
    )
}

export default GameView