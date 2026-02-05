import { describe, it, expect, beforeEach } from "vitest";
import request from 'supertest';
import { app, games } from './server.ts'

describe('Tic Tac Toe API', () => {

    beforeEach(() => {
        games.clear()
    })
   
    describe('GET /list', () => {
        it('should return multiple games', async() => {
            const game1 = await request(app)
                .post("/create")
                .expect(200)

            const game2 = await request(app)
                .post("/create")
                .expect(200)

            const response = await request(app)
                .get("/list")
                .expect(200)
            expect(response.body.length).toBe(2)
            expect(response.body[0].id).not.toBe(response.body[1].id)
        })

        it('should return a single game', async() => {
            const game1 = await request(app)
                .post("/create")
                .expect(200)

            const response = await request(app)
                .get("/list")
                .expect(200)
            expect(response.body.length).toBe(1)
            expect(typeof response.body[0].id).toBe('string')
        })

        it('should return no games if none exist', async() => {
            const response = await request(app)
                .get("/list")
                .expect(200)
            expect(response.body.length).toBe(0)
        })
    })

    describe('POST /create', () => {
        it('should create a game', async() => {
            const response = await request(app)
                .post("/create")
                .expect(200)
            expect(typeof response.body.id).toBe('string')
            expect(response.body.board).toEqual([null, null, null, null, null, null, null, null, null])
            expect(response.body.currentPlayer).toBe("X")
            expect(response.body.winner).toBe(null)
        })
    })

    describe('GET /game/:id', () => {
        it('should return a single game by uuid', async() => {
            const game1 = await request(app)
                .post("/create")
                .expect(200)

            const uuid = game1.body.id
            const response = await request(app)
                .get("/game/" + uuid)
                .expect(200)
            expect(response.body.id).toBe(uuid)
        })
    })

    describe('POST /move/:id', () => {
        it('should update a game based on a move', async() => {
            const game1 = await request(app)
                .post("/create")
                .expect(200)

            const uuid = game1.body.id
            console.log('TEST UUID: ', uuid)
            console.log('TEST typeof UUID: ', typeof uuid)
            const response = await request(app)
                .post("/move/" + uuid)
                .send({ position: 0 })
                .expect(200)
            expect(response.body.id).toBe(uuid)
            expect(response.body.board).toEqual(["X", null, null, null, null, null, null, null, null])
            expect(response.body.currentPlayer).toBe("O")
            expect(response.body.winner).toBe(null)
        })
    })
})
