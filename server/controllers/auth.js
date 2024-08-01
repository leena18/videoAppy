import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from "../error.js";
import User from '../models/Users.js';

export const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});

       await  newUser.save();
        res.status(200).send("User has been registered successfully")
    }
    catch(err){
        next(createError(404, "User already exixts"))
    }
};

export const login = async (req, res) => {
    try{
        const user = await User.findOne({name: req.body.name});
        !user && res.status(400).json("User not found");

        const validPassword = await bcrypt.compareSync(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong credentials");

        const token = jwt.sign({id:user._id}, process.env.JWT)
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200)
        .json(others);
    }
    catch(err){
        console.log(err)
    }
};


