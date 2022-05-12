const asyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req,res) => {
  const goals = await Goal.find({user:req.user.id})

  res.status(200).json(goals)
})

const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Tidak boleh kosong")
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal tidak ditemukan')
  }

  // Check User
  if(!req.user){
    res.status(401)
    throw new errorMonitor('User tidak ditemukan')
  }

  // Make sure the login user matches the goal user
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User tidak memiliki izin')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body, {
    new:true
  })

  res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error("Goal tidak ditemukan")
  }

  // Check User
  if (!req.user) {
    res.status(401)
    throw new errorMonitor("User tidak ditemukan")
  }

  // Make sure the login user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User tidak memiliki izin'")
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
}
