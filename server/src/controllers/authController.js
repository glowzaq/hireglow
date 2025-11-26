import bcrypt from 'bcryptjs'
import generateToken from '../utils/token.js'
import User from '../models/User.model.js'
import validator from 'validator'

export const register = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" })
        }

        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await User.create({
            fullname,
            email,
            password: hashed,
            role: role || "candidate",
        })

        const token = generateToken({ id: user._id, role: user.role })
        res.status(201).json({
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error, "Registration error");
        res.status(500).json({ message: "Server error"})
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message: "Please provide email and password"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const matched = await bcrypt.compare(password, user.password)
        if(!matched){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = generateToken({id: user._id, role: user.role})

        res.status(201).json({
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error, "Login error");
        res.status(500).json({message: "Server error"})
    }
}
