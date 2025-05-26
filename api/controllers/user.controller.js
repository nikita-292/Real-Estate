// controllers/user.controller.js
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Api route working ",
  });
};

export const updateUser = async (req, res, next) => {
  if  (req.user.id !== req.params.id) {
    // req.params.id ye we get from the root ===/update/:id'
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // Check if a password is being updated and hash it before saving
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          //dont send ...req.body in the set bcz  we dont have extra info thats is not the form and yet to be
          //  saved
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // to return the updated document
    );
    // Destructure to remove password from the response
    const { password, ...rest } = updatedUser._doc;

    // Send response with user details excluding the password
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  //check the token first 
  if  (req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted ");
  } catch (error) {
    next(error);
  }
};
