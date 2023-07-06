// dependences
const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const ProfileModel = require('./models/profileModel')

require('dotenv').config()


const PORT = process.env.PORT
const app = express()

// middleware
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// connect to mongoDB
mongoose.set('strictQuery', true)
async function connectToDB(){

 try {
 await mongoose.connect(process.env.MONGO_DB_URI)
 console.log(`connected to DB`)
} catch (e) {
console.log(`connection failed ${e}`)
}

}
connectToDB();

// get request to get all documents
app.get('/users', (req, res) => {
    async function getUsers(){
        try{
            const allUsers = await ProfileModel.find()

            res.status(200).send({
                message: 'users found',
                payload: allUsers
            })
        }catch(e){
            res.status(400).send({
                message: 'error in get request',
                data: e,
            })
        }
    }
    getUsers()
})

// post request to make a new user
app.post('/create-user', (req, res) => {
    const data = req.body

    async function makeUser(){
        try{
            const newUser = ProfileModel.create({
                name: data.name,
                age: data.age,
                height: data.height,
            })

            res.status(200).send({
                message: 'user created',
                payload: newUser
            })
        }catch(e){
            res.status(400).send({
                message: 'error in post',
                data: e,
            })
        }
    }
    makeUser()
})

// delete request to delete a user
app.delete('/delete-user', (req, res) => {
    const data = req.body
    
    async function deleteUser(){
        try{
            await ProfileModel.findByIdAndDelete(data._id)

            res.status(200).send({
                message: 'profile deleted',
            })
        }catch(e){
            res.status(400).send({
                message: 'error in deleting user',
                data: e,
            })
        }
    }
    
    deleteUser()

})

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
})
