import express from "express"; // Remover { request, response }
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json())


//Criar usuarios
app.post ("/usuarios", async(req,res) =>{
    await prisma.user.create({
        data: {
            email: req.body.email,
            name : req.body.name,
            telefone : req.body.telefone,
            senha: req.body.senha
        }
    })

    res.status(201).json(req.body)
})

//Editar usuarios
app.put ("/usuarios/:id", async(req,res) =>{

    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name : req.body.name,
            telefone : req.body.telefone,
            senha: req.body.senha
        }
    })
    res.status(201).json(req.body)
})

/*
    1 - tipo de rota / metodo HTTP
    2 - tipo usuarios   
*/

//listar usuarios
app.get("/usuarios", async (req, res) => {

    let users = []
    
    if (req.query) {
        users = await prisma.user.findMany({
        where:{
            name: req.query.name,
            email: req.query.email
        }
       })
    }else{
        users = await prisma.user.findMany()
    }

    
    res.status(200).json(users)
});

app.delete ("/usuarios/:id", async(req,res) =>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message:"teste"})
})

app.listen(5173)