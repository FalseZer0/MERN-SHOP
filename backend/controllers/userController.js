import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
//@desc auth user and obtain token
//@route POST /api/users/login
//@access public route
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    await generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    //unauthorized
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc register a new user
//@route POST /api/users/login
//@access public route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    //create is the same as save and hence the password is automatically encryptped
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      await generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

//@desc get user profile
//@route GET /api/users/profile
//@access private route
const getUserProfile = asyncHandler(async (req, res) => {
  //the token does not distinct from the priviliged user and non privileged user, rather it is used to know whether it is a user or non user
  //having a token after authentication we must be able to firstly identify if the user is authorized for the requested endpoint and then reply with needed info if any
  //const user = await User.findById()
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc get all users
//@route GET /api/users
//@access private/admin route
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc delete user
//@route DELETE /api/users/:id
//@access private/admin route
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc update user profile
//@route PUT /api/users/profile
//@access private route
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      //password encryptped by middleware in user schema
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    await generateToken(res, user._id);
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc get user by id
//@route GET /api/users/:id
//@access private/admin route
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc update user
//@route PUT /api/users/:id
//@access private admin route
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
