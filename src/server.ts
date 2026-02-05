import express from "express"
import type { Request, Response } from "express"
import ViteExpress from "vite-express"
import { createGame, makeMove, type GameState } from "./go.ts"

type Games = Map<string, GameState>

const PORT = 3000

export let games: Games = new Map()
export const app = express()

app.use(express.json())

app.post("/create", (_, res: Response) => {
    const game = createGame() 
    games.set(game.id, game)
    res.json(game)
})

app.get("/list", (_, res: Response) => {
    // convert Map object into list with no ID tags
    const gamesArray = Array.from(games.values())
    res.json(gamesArray)
})

app.get("/game/:id", (req: Request, res: Response) => {
    // extract id
    const uuid = req.params.id as string
    
    // get game
    const game = games.get(uuid)

    // return game with given id
    res.json(game)
})

app.post("/move/:id", (req: Request, res: Response) => {
    console.log('SERVER: POST MOVE/ID')
    // extract id and position
    const uuid = req.params.id as string
    const position = req.body.position
    
    // get game
    let game = games.get(uuid) as GameState

    // make move
    game = makeMove(game, position)

    // return game with given id
    res.json(game)
})


/*
app.post("/move", (req: Request, res: Response) => {
    let position = req.body.positionMessage
    gameState = makeMove(gameState, position)
    //console.log(gameState)
    res.json(gameState)
})
*/

/*
app.post("/reset", (_, res: Response) => {
    gameState = createGame()
    res.json(gameState)
})
*/

ViteExpress.listen(app, PORT, () => console.log(`Server is listening on port ${PORT}...`));