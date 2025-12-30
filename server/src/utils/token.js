import jwt from 'jsonwebtoken'

const generateToken = (user)=>{

    const payload = {
        id: user._id,
        role: user.role,
        department: user.department
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    })
}

export default generateToken