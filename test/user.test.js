const { app, server } = require("../index");
let database = require("../database.json")

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
it("check data type of player info", async () => {
    let array1 = database.players
    
    array1.forEach(object => {
        expect(object).toEqual(expect.objectContaining({ fname: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ lname: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ gender: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ sport: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ skill: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ dob: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ email: expect.any(String) }));
        expect(object).toEqual(expect.objectContaining({ password: expect.any(String) }));
            
    });
})
