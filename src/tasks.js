import uuid from 'react-uuid';
import { client, runDb, db } from "../connnectDb.js";

export const getAllProject = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email } = request.body
    db.collection("tasks").findOne({email: email}).then((res) => {
        console.log(res)
        response.status(200).json(res.project)
    }).catch(console.error)
}

export const getAlltask = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email, projectTitle } = request.body
    db.collection("tasks").findOne({project: projectTitle}).then(res => response.status(200).json(res))
}

export const addTask = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email, projectTitle, projects } = request.body
    console.log(projects)
    db.collection("tasks").findOneAndUpdate({email: email}, {$set: {"project.$[element].projects" : projects}}, {arrayFilters: [{"element.title": projectTitle}]}).then(res => {
        response.status(201).json(res)
    })
}

export const addProject = async (request, response) => {
    await client.connect()
    console.log(request.body)
    const { email, projectTitle } = request.body
    db.collection("tasks").findOneAndUpdate({email: email},{$push: {project : {projectId: uuid(), title: projectTitle, projects:{}}}}, {upsert: true}).then(res => {
        response.status(201).json(res)
    }).catch(console.error)
}

// {
//     _id: new ObjectId("645df31c7102daf7f0dc32fa"),
//     email: 'rikusrocks@gmail.com',
//     project: [
//       {
//         projectId: '6c808b0f-0170-e45a-107b-47249c42b18e',
//         title: 'default'
//       }
//     ]
//   }