const User = require('../models/user');


async function handleGetAllUsers(req,res){
    res.json(users)
}

async function handleGetUserById(req,res){
    const userId = Number(req.params.id)
    const user = users.find(u => u.id === userId)
    return res.json(user)
}

async function handleCreateUser(req,res){
    const body = req.body
    if(!body.firstName || !body.lastName || !body.email || !body.jobTitle) {
       
        return res.status(400).json({"message": "All fields are required"})
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle
    })

    console.log(result)
    return res.json({"message": "User created successfully", "user": result})
}