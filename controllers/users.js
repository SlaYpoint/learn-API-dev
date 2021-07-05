const ErrorRespose = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc  Get all users
// @route  GET /api/v1/auth/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
});

// @desc  Get single user
// @route  GET /api/v1/auth/users/:id
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    });
    
});

// @desc  Get single user
// @route  GET /api/v1/auth/users/:id
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = User.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: user
    });
    
});

// @desc  Create user
// @route  POST /api/v1/auth/users
// @access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check if user already exists
    const userExist = await User.findOne({ user: req.user.id });
    
    if (userExist) {
      return next(new ErrorRespose(`The user with ID ${req.user.id} already exists.`, 400));
    }
  
    // Create user
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
    
});

// @desc  Update user
// @route  PUT /api/v1/auth/users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
    
});

// @desc  Delete user
// @route  DELETE /api/v1/auth/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: []
    });
    
});