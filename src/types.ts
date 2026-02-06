import { type GameState } from "./go.ts"

export type GameID = string | null
export type Games = Map<string, GameState>