const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require("../models/userModel")

const registerUser = asyncHandler(async (req,res) => {
  const {name,email,password} = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Data tidak boleh kosong')
  }

  const userExist = await User.findOne({email})

  if(userExist) {
    res.status(400)
    throw new Error('Email telah digunakan')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Data user tidak valid')
  }
})

const loginUser = asyncHandler(async (req,res) => {
  const {email,password} = req.body

  const user = await User.findOne({email})

  if(user&& (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Credentials tidak valid")
  }
})

const authUser = asyncHandler(async (req,res) => {

  res.status(200).json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  authUser
}