import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        trim: true,
        minlenght: [3, 'Fullname must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlenght: [8, 'Password must be at least 8 characters'],
        validate: {
            validator: function (value){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test( value)
            },
            mesage: 'Password must contain uppercase, lowercase, number, and special character',
        }
    },
    role: {
        type: String,
        enum: ['candidate', 'employer', 'admin'],
        default: 'candidate',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true,
}
);

export default mongoose.model('User', userSchema);