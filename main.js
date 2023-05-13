import express from 'express';
import cors from 'cors';
import { listUser, regitser, login, updatePassword } from './src/user.js';
import { getAllProject, addTask } from './src/tasks.js'
import { runDb } from './connnectDb.js';

const PORT = 3001;
const app = express()
app.use(cors())
app.use(express.json())
runDb().then(() => console.log('db connected')).catch(console.dir)

app.listen(PORT,() => {
    console.log(`Server running at ${PORT} port.`)
})

app.get("/listUser", listUser)
app.post("/register", regitser)
app.post("/login", login)
app.post("/updatepassword", updatePassword)

app.post("/getprojects", getAllProject)
app.post("/addtask", addTask)


app.on('error', () => {
    console.error("something wrong")
})