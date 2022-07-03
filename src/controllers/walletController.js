import db from "../databases/mongo.js";
import joi from "joi"

export async function solicitarDados(req, res) {
    const carteiraDados = await db.collection("carteiraDados").find({ userId: res.locals.userId }).toArray()

    res.send(carteiraDados.reverse())
}

export async function adicionarDados(req, res) {
    const {value, name, date, state} = req.body

    const adicionarDadosSchema = joi.object({
        value: joi.number().required(),
        name: joi.string().required(),
        date: joi.string().required(),
        state: joi.boolean().required()
    })
    
    const validation = adicionarDadosSchema.validate({value, name, date, state})

    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }

    await db.collection("carteiraDados").insertOne({value, name, date, state, userId: res.locals.userId })

    res.sendStatus(201)
}