const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const JWT_SECRET_KEY = "your_actual_secret_key_here";

const signup = async (req,res) => {
    // console.log('signup func here we go')
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({message: "user already exists"})
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        rating: '0',
        liked_recipes: '0',
        searched_ingredients: '0'
    });
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({message: user})
}

const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log('login func here we go')
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({message: "Invalid Username"})
    }
    else console.log('valid username')
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid Password"})
    }
    else console.log('valid password')

    const token = jwt.sign({id: existingUser._id}, JWT_SECRET_KEY, {
        expiresIn: "1h" //1hr
    });
    console.log("Generated Token\n", token);
    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = ""
    }
    res.cookie(String(existingUser._id), token, {
        path:"/",
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiration
        httpOnly: true,
        sameSite: "lax",
    })

    return res
    .status(200)
    .json({message: "Successfully Logged In", user: existingUser, token});
}

const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "938f1f8c54bd04",
        pass: "********42e7"
    }
});

const forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    console.log('fp func here we go');
    let user;
    try {
        user = await User.findOne({ email });
        console.log('user found by email');
    } catch (err) {
        console.log('user not found');
        return res.status(500).json({ message: "An error occurred while finding the user." });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    try {
        // Update the user's password directly in the database
        user.password = bcrypt.hashSync(password);

        // Save the updated user document
        await user.save();

        console.log('Password successfully updated');

        // Send email to user
        const mailOptions = {
            from: 'danaayounus@gmail.com', 
            to: 'mushtaqnabila@gmail.com',
            subject: 'Password Reset',
            text: 'Your password has been successfully reset.'
        };

        let transporter = nodemailer.createTransport ({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "danaayounus@gmail.com",
                pass: "oxxu ebmn pirt dhih",
            }
        });
        
        transporter.sendMail(mailOptions, function(error,info){
            if(error)
            {
                console.log("Error while sending email");
                console.log(error)
                return res.status(200).json({message: "password changed"})
            }
            else {
                console.log("Email sent successfully!")
                return res.status(200).json({message: "password changed"})
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while updating the password." });
    }
};

// const updateLike = async (req, res) => {
//     const { recipeId } = req.params;
//       const { like } = req.body;
//       try {
//           const updatedRecipe = await recipesModel.findByIdAndUpdate(
//               recipeId,
//               { $set: { like: like } }, // Update the like field
//               { new: true }
//           );
  
//           if (!updatedRecipe) {
//               return res.status(404).json({ message: 'Recipe not found' });
//           }
  
//           return res.status(200).json({ message: 'Like updated successfully', recipe: updatedRecipe });
//       } catch (error) {
//           console.error('Error updating like:', error);
//           return res.status(500).json({ message: 'Internal server error' });
//       }
// }

// Helper function to generate a random reset token
function generateResetToken() {
    // Implement logic to generate a random reset token
    // For example:
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}


const verifyToken = (req,res,next) => {
    const cookies = req.cookies;
    if (!cookies) {
        return res.status(404).json({ message: "Cookies not found" });
    }
    const token = cookies.split('=')[1];
    if (!token) {
        return res.status(404).json({ message: "Token not found" });
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (err,user) => {
        if (err){
            return res.status(400).json({message: "Invalid Token"})
        }
        console.log(user.id);
        req.id = user.id;
    });
    next();
};

const getUser = async(req, res, next) => {
    const userId = req.id;
    let user;
    try{
        user = await User.findById(userId, "-password");
    } catch (err) {
        return new Error(err)
    }
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({user});
}

const refreshToken = (req,res,next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split('=')[1];
    if (!prevToken) {
        return res.status(400).json({message: "Couldn't find token"})
    }
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err,user) => {
        if (err){
            console.log(err);
            return res.status(403).json({message: "Authentication failed"});
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({id: user.id}, JWT_SECRET_KEY, {
            expiresIn: "1h" //1hr
        });
        console.log("Re-generated Token\n", token);
        res.cookie(String(user.id), token, {
            path:"/",
            expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiration
            httpOnly: true,
            sameSite: "lax",
        })
        req.id = user.id;
        next();
    });
}

const logout = (req, res) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split('=')[1];
    if (!prevToken) {
        return res.status(400).json({message: "Couldn't find token"})
    }
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err,user) => {
        if (err){
            console.log(err);
            return res.status(403).json({message: "Authentication failed"});
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({message: "Successfully Logged Out"});
    });
    
}

module.exports = {
    logout,
    signup,
    login,
    forgotPassword,
    verifyToken,
    getUser,
    refreshToken
};
