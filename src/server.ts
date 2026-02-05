import express from "express"
import type { Request, Response } from "express"
import ViteExpress from "vite-express"
import { createGame, makeMove, type GameState } from "./go.ts"

const app = express()
const PORT = 3000

app.use(express.json())

let gameState: GameState = createGame()

app.get("/game", (_, res: Response) => {
    res.json(gameState)
})

app.post("/move", (req: Request, res: Response) => {
    let position = req.body.positionMessage
    gameState = makeMove(gameState, position)
    //console.log(gameState)
    res.json(gameState)
})

app.post("/reset", (_, res: Response) => {
    gameState = createGame()
    res.json(gameState)
})

ViteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT}...`));