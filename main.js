import express from 'express';
import cors from 'cors';
import { listUser, regitser } from './src/user.js';
import mongoose from "mongoose";


// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'});

//     res.end('Hello World!')
// }).listen(8888)

const PORT = 3001;
const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT,() => {
    console.log(`Server running at ${PORT} port.`)
})

app.get("/listUser", listUser)
app.get("/register", regitser)

app.on('error', () => {
    console.error("something wrong")
})