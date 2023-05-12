import mongoose from "mongoose";
import uuid from 'react-uuid';
import { client, runDb, db } from "../connnectDb.js";

export const listUser = (req, res) => {
    res.status(201).send("get user list")
}

export const regitser = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email, password } = request.body
    db.collection("user").findOne({email: email}).then(async (res) => {
        console.log(res)
        if(res) {
            response.status(401).send("this email has been registered.")
        } else {
            await db.collection("user").insertOne({
                "_id": uuid(),
                "email": email,
                "password": password
            })
            await db.collection("tasks").insertOne({
                email : email,
                project : [ {
                    projectId: uuid(),
                    title: "default",
                }]
            })
            response.status(201).send("user registed")
        }
    })
}

export const login = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email, password } = request.body
    db.collection("user").findOne({email: email}).then((res) => {
        res.password === password ? response.status(201).json(res) : response.status(401).send("wrong credentials")
    })
}