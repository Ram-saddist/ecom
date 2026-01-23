const express = require("express")
const User = require("../models/User.js")
const route = express.Router()
const bcrypt = require("bcrypt")

route.post("/create-user", async (req, res) => {
    try {
        const { name, email, password, mobile, address } = req.body
        console.log(email)
        let user = User.findOne({ email })
        if (user) {
            return res.status(400).json({ "message": "user already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = new User({
            name, email, password, mobile, address
        })
        await User.save()
        return res.status(201).json({ "message": "user created successfully" })
    }
    catch (err) {
        return res.status(500).json({ "message": "internal server error while creating user" })
    }
})
module.exports = route