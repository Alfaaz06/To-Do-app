import User from '../models/user.js';

export const register = async(req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username already taken"
            });
        }

        const newUser = await User.create({ username, password });
        return res.status(201).json({
            success: true,
            message: "Registered Succeffully\nPlease login to authenticate yourself!",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select("password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Username and password do not match"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Username and password do not match"
            });
        }
        const token = await user.genrateToken();
        const options = { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), httpOnly: true }
        return res.status(200).cookie("token", token, options).json({
            success: true,
            message: "User logged in successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            return res.status(200).json({
                success: true,
                user
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addTodo = async(req, res) => {
    try {
        const { heading, desc } = req.body;
        const user = await User.findById(req.user.id);
        if (user) {
            user.todos.unshift({ heading, desc });
            await user.save();
            return res.status(200).json({
                success: true,
                message: "To-Do added successfully",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const removeTodo = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { id } = req.body;
        if (user && user.todos.length > 0) {
            user.todos = user.todos.filter((todo) => todo._id.toString() !== id);
            await user.save();
            return res.status(200).json({
                success: true,
                message: "To-Do removed successfully",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Your todo list is empty"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateUsername = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            const { username } = req.body;
            if (await User.findOne({ username })) {
                return res.status(400).json({
                    success: false,
                    message: "Username already taken"
                });
            }
            if (username) {
                user.username = username;
            }
            await user.save();
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updatePassword = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('password');
        const { oldPassword, newPassword } = req.body;
        console.log(req.body);
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter old and new password"
            });
        }
        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password does not match"
            });
        }
        user.password = newPassword;
        await user.save();
        console.log('User Saved');
        return res.status(200).json({
            success: true,
            message: "Password updated successfully\nPlease login to authenticate yourself!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async(req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: 'Logged Out Successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}