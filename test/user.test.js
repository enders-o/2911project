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

it("registration page", async () => {
    await request(server)
    .get("/register")
    .expect(res => {
        res.text.includes('email');
        res.text.includes('password');
        res.text.includes('firstName');
        res.text.includes('lastName');
        res.text.includes('gender');
    })
    .expect(200);
});