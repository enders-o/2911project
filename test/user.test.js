const { app, server } = require("../index");

const { test, expect, done } = require("@jest/globals");
const request = require("supertest")

afterAll( async () => {
    server.close()
})

it("login page", async () => {
    await request(server)
    .get("/login")
    .expect(res => {
        res.text.includes('email');
        res.text.includes('password');
    })
    .expect(200);
});