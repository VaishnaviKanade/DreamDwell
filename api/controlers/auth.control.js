import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

     password = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password });

    await newUser.save();

    return res.status(201).json("User created Successfully");
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user', error });
  }
};
