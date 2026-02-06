import express from "express"
import expressWs from 'express-ws'
import type { Request, Response } from "express"
import ViteExpress from "vite-express"
import { createGame, makeMove, type GameState } from "./go.ts"
import { type Games } from './types.ts'

const PORT = 3000

export let games: Games = new Map()
export const app = express()
expressWs(app)

app.use(express.json())

app.get("/list", (_, res: Response) => {
    const gamesList = Array.from(games.values())
    res.json(gamesList)
})

app.get("/game/:id", (req: Request, res: Response) => {
    const uuid = req.params.id as string
    const game = games.get(uuid)
    res.json(game)
})

app.post("/create", (_, res: Response) => {
    const game = createGame() 
    games.set(game.id, game)
    res.json(game)
})

app.post("/move/:id", (req: Request, res: Response) => {
    // extract id and position
    const uuid = req.params.id as string
    const position = req.body.position

    // get game
    let game = games.get(uuid) as GameState

    // make move
    game = makeMove(game, position)

    // change games Map
    games.set(uuid, game)

    // send updated game
    res.json(game)
})

ViteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT}...`));