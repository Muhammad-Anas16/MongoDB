import express from 'express';
import Joi from 'joi';
import User from '../Models/User.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
const authRoute = express.Router()
import ResFunc from '../ResFunc/ResFunc.js';

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'co', 'pk'] } }).required(),

    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'co', 'pk'] } }).required(),

    password: Joi.string().min(6).required(),
})

authRoute.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { error, value } = registerSchema.validate(req.body);

        if (error) return ResFunc(res, 400, true, null, error);

        const userEmail = await User.findOne({ email: value.email })

        if (userEmail) return ResFunc(res, 403, true, null, "A User is already Registered with this email")

        const hashPassword = await bcrypt.hash(value.password, parseInt(process.env.saltRounds));

        value.password = hashPassword

        let newUser = new User({ ...value })

        newUser = await newUser.save()

        ResFunc(res, 201, false, newUser, "User Register Succesfully!")

    }
    catch (err) {
        ResFunc(res, 500, true, null, err.message)
    }


});

authRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error, value } = loginSchema.validate(req.body);
        if (error) return ResFunc(res, 400, true, null, error);
        const findUser = await User.findOne({ email: value.email }).lean()
        if (!findUser) return ResFunc(res, 403, true, null, "User is not Regitered");
        const isPasswordValid = await bcrypt.compare(value.password, findUser.password);
        if (!isPasswordValid) return ResFunc(res, 403, true, null, "Invalid Credentials");

        var token = jwt.sign(findUser, process.env.Auth_Secret);

        ResFunc(res, 201, false, { findUser, token }, "User Login Succesfully!")

    }
    catch (err) {
        ResFunc(res, 500, true, null, err.message)
    }
});


// authRoute.post("/resetpassword", (req, res) => {})
// authRoute.post("/forgetpassword", (req, res) => {})

export default authRoute;