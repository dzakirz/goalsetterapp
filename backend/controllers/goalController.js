const asyncHandler = require("express-async-handler")
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()

  res.status(200).json(goals)
})

const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Text harus diisi")
  }

  const goal = await Goal.create({
    text: req.body.text
  })

  res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal tidak ditemukan')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error("Goal tidak ditemukan")
  }

  await goal.remove()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
}
