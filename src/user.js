import mongoose from "mongoose";
import uuid from 'react-uuid';

export const listUser = (req, res) => {
    res.status(201).send("get user list")
}

export const regitser = (req, res) => {
    console.log(req.body)
    const userSchema = new mongoose.Schema({
        email : req.body.email,
        id: uuid(),
        project : [ {
            task: {
                title,
                todo,
                doing,
                done
            }
        }]
    })
    res.status(201).send("register user")
}