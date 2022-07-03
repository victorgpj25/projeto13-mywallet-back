import joi from "joi"
import bcrypt from "bcrypt"
import db from "../databases/mongo.js";
import { v4 as uuid } from "uuid"

export async function logar(req, res) {
    const { email, password } = req.body;

    const loginSchema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.required()
    })
    
    const validation = loginSchema.validate({email, password})

    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }

    const user = await db.collection("users").findOne({ email })

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        
        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })

        res.send({token, name: user.name})
    } else {
        res.sendStatus(401)
    }
}

export async function cadastrar(req, res) {
    const {name, email, password} = req.body;

    const cadastroSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.required()
    })
    
    const validation = cadastroSchema.validate({name, email, password})

    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }

    const emailAlreadyInUse = await db.collection("users").find({email: email}).toArray()

    if (emailAlreadyInUse.length) {
        res.sendStatus(409)
        return
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, email, password: passwordHash }) 

    res.sendStatus(201);
}