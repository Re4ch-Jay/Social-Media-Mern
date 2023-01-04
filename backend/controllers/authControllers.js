const User = require("../models/User")
const bcrypt = require('bcrypt')
const {isEmail, isStrongPassword} = require("validator")

const REGISTER = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!username && !email && !password) throw Error("All fields are required")
        if(!username) throw Error("Username is required")
        if(!email) throw Error("Email is required")
        if(!password) throw Error("Password is required")

        if(!isEmail(email)) throw Error("Email is invalid")
        if(!isStrongPassword(password)) throw Error("Password must be strong")

        const isUsernameExist = await User.find({username})
        if(isUsernameExist) throw Error("This username is already existed")

        const isEmailExist = await User.find({email})
        if(isEmailExist) throw Error("This email is already existed")

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({username, email, password: hash})
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const LOGIN = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email && !password) throw Error("All fields are required")
        if(!email) throw Error("Email is required")
        if(!password) throw Error("Password is required")

        const user = await User.findOne({email})
        if(!user) throw Error("Invalid email")

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass) throw Error("Wrong password")

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}


module.exports = {REGISTER, LOGIN}
