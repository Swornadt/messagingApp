import { User }  from '../models/userSchema.js';
import bcrypt from   "bcryptjs";
import jwt from "jsonwebtoken";

//dotenv.config();
export const register = async ( req, res ) => {
    try {
        const {fullName, username, email, password, confirmPassword, gender } =  req.body;
        if (!fullName || !username || !email || !password || !confirmPassword || !gender ) {
            return res.status(400).json({
                message: "All fields are  required",
                success: false
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                success: false
            })
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }]});
        if (existingUser) {
            return res.status(400).json({
                message: 'User with email or username already exists!'
            });
        }

        //User Creation
        const hashedPassword = await bcrypt.hash(password, 4);
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            email,
            password:hashedPassword,
            profilePhoto: gender === "Male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: "true"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

//LOGIN
export const login = async ( req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields must are requird",
                success: "false"
            });
        };
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message:"Incorrect username or password, user not found.",
                success:false
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        };

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        return res.status(200).cookie("token", token, {maxAge:24*60*60*1000})
                              .json({
                                    _id: user._id,
                                    username: user.username,
                                    fullName: user.fullName,
                                    profilePhoto: user.profilePhoto
                              });
    } catch (error) {
        console.log(error);
    }
}

//LOGOUT
export const logout = ( req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0})
                              .json({
                                    message: "User logged out successfully",
                                    success: true
                              })
    } catch (error) {
        console.log(error);
    }
}

//GetOtherUsers
export const GetOtherUsers = async ( req, res ) => {
    try {
        const loggedInUserid = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserid}}).select("-password");
        return res.status(200).json(otherUsers)
    } catch (error) {
        console.log(error);
    }
}