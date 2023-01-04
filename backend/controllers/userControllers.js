const User = require("../models/User")

const GET_USER = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) throw Error("Sorry!, cannot find that user")
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

module.exports = {GET_USER}