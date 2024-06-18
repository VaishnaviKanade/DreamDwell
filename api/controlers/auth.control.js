import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({ username, email, password:hashedPassword});
    
    try {
    await newUser.save();
     res.send(201).json("User created Successfully");
  } catch (error) {
   next(error);
  }
};
