const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// @desc    Get Goal
// @route   GET /api/goals
// @access  Private
const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json({ message: 'Get goals', response: goals});
});


// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
    });

    res.status(200).json({ succes: 'Goals Submitted Successfully', msg: goal,});
});


// @desc   Update Goals
// @route  GET /api/goals
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateGoal);
});


// @desc   Update Goals
// @route  GET /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    await goal.remove();
    res.status(200).json({ id: req.params.id, message: 'Id deleted'});
});

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}