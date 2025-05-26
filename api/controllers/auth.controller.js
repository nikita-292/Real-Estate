import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);//hashSync se await asynxc use nhi krna padhtha
  
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    //creating a token for future use for user so yha hum id us ekr rhe  an dsaving as it a cookies
    //httpOnly true maltba no ther paty can have access ti vcookie and expires maltba whi kabtak rahega
    
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;//separated the  password 
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//google se login jab krte tab 
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Update existing user's avatar if it's different
      // if (user.avatar !== req.body.photo) {
      //   user.avatar = req.body.photo;
      //   await user.save();
      // }

      //console.log("Avatar : ",user.avatar);
      //console.log("Req : ",req.body.photo);
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);//toString(36) => matlab numbers from 0 to9 and letter from a toz () slice(-8) last 8 digit kyuki math.romdom asie digit banayeg  0.67adh566

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
           //use name ko eksath krke uska lowercase and join then also add so e numer exampple  nikita parashar = nikitaparashar123
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      //console.log("New user created with email:", newUser.avatar);
      
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};