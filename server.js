/*
    Create our user API
    - Create the user
    - List all users
    - Edit a user
    - Delete a user
*/
import express from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = []

app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
})
app.get('/users', async (req, res) => {
    const users = []
    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age,
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
    res.status(201).json(users)
})

app.put('/users/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'User Sucessfull Deleted!'})
})
app.listen(3000)