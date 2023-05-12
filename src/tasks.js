import uuid from 'react-uuid';
import { client, runDb, db } from "../connnectDb.js";

export const getAllProject = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email } = request.body
    db.collection("tasks").findOne({email: email}).then((res) => {
        console.log(res)
        response.status(201).json(res.project)
    }).catch(console.error)
}