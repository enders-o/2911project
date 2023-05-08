const { app, server } = require("../index");

const { test, expect, done } = require("@jest/globals");
const { response } = require("express");
const request = require("supertest")

afterAll( async () => {
    server.close()
})

it("login page", async () => {
    await request(server)
    .get("/login")
    .expect(200)
});