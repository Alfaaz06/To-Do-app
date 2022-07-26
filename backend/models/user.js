import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: [true, 'Username already taken']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    todos: [{
        heading: {
            type: String,
            default: "Just a To-Do thing! "
        },
        desc: {
            type: String,
            required: [true, 'Please enter a todo']
        },
        time: {
            type: Date,
            default: Date.now,
        }
    }]
})

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.genrateToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

export default mongoose.model("User", userSchema)