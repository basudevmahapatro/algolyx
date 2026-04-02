import userModel from "../models/user.model.js";
import crypto from  "crypto";
import jwt from "jsonwebtoken"
import config from "../src/config/config.js"
import sessionModel from "../models/session.model.js";
import { sendEmail } from "../services/email.service.js";
import {generateOTP, getEmailHTML} from "../utils/utils.js"
import otpModel from "../models/otp.model.js"


export async function register(req, res){
    const {email, username, password} = req.body;
    
    const isAlreadyRegistered = await userModel.findOne({
        $or : [
            {username}, {email}
        ]
    });

    if(isAlreadyRegistered){
        return res.status(409).json({
            message : "User is already registered."
        });
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username : username,
        email : email,
        password : hashedPassword
    });

    const otp = generateOTP();
    const html = getEmailHTML({ OTP: otp });

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await otpModel.create({
        email,
        user : user._id,
        otpHash
    })

    await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`, html);

    res.status(201).json({
        message : "User is registered successfully",
        user : {
            username : username,
            email : email,
            verified : user.verified
        }
    });

}

export async function getMe(req, res){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        });
    }

    let decoded;
    try{
        decoded = jwt.verify(token, config.JWT_SECRET);
    }catch(error){
        return res.status(401).json({
            message : "Invalid token."
        });
    }

    const user = await userModel.findById(decoded.id);

    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }

    res.status(201).json({
        message : "user fetched successfully",
        user : {
            username : user.username,
            email : user.email
        }
    });  
}

export async function refreshToken(req,res){
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({
            message : "Refresh token is not included in headers."
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    }catch(error){
        return res.status(401).json({
            message : "User is not authorised."
        });
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash : refreshTokenHash,
        revoked : false
    });

    if(!session){
        return res.status(401).json({
            message: "Invalid refresh token"
        }); 
    };

    const newAccessToken = jwt.sign(
        {
            id : decoded.id
        },
        config.JWT_SECRET,
        {
            expiresIn : "15m"
        }
    );

    const newRefreshToken = jwt.sign(
        {
            id : decoded.id
        },
        config.JWT_SECRET,
        {
            expiresIn : "7d"
        }
    );  

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge : 7*24*60*60*1000
    });

    res.status(201).json({
        message : "Access token refreshed successfully.",
        accessToken : newAccessToken
    });
}

export async function logout(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message : "Refresh token is not attached"
        });
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash : refreshTokenHash,
        revoked : false
    });

    if(!session){
        return res.status(401).json({
            message : "Invalid refresh Token."
        });
    }

    session.revoked = true;
    await session.save(); 

    res.clearCookie("refreshToken");

    res.status(201).json({
        message : "Logged out successfully"
    });
}

export async function logoutAll(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message : "Refresh token is not attached."
        });
    }

    let decoded;
    try{
        decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    }catch(error){
        return res.status(401).json({
            message : "User is not authorised."
        })
    }

    await sessionModel.updateMany({
        user : decoded.id,
        revoked : false
    }, 
    {
        revoked : true
    });

    res.clearCookie("refreshToken");

    res.status(201).json({
        message : "User logged out successfully from all devices."
    });

}

export async function login(req,res){
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email : email
    });

    if(!user){
        return res.status(401).json({
            message : "No user found with this email. Kindly register this email."
        });
    }

    if(!user.verified){
        return res.status(401).json({
            message : "Email is not verified yet. Verify it first."
        })
    }
    
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");
    
    if(passwordHash!==user.password){
        return res.status(401).json({
            message : "Incorrect password."
        }); 
    }
    
    const refreshToken = jwt.sign({
        id : user._id,
    },
    config.JWT_SECRET,
    {
        expiresIn : "7d"
    });
    
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user : user._id,
        refreshTokenHash : refreshTokenHash,
        ip: req.ip,
        userAgent : req.headers["user-agent"],
        revoked : false
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
        maxAge : 7*24*60*60*1000
    });

    const accessToken = jwt.sign({
        id : user._id,
        sessionId : session._id
    },
    config.JWT_SECRET,
    {
        expiresIn : "15m"
    });

    res.status(201).json({
        message : "User is logged in successfully",
        user : {
            username : user.username,
            email : email,
        },
        accessToken
    })
}

export async function verifyOTP(req,res){
    const {email, otp} = req.body;
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpRecord = await otpModel.findOne({
        email,
        otpHash
    });

    if(!otpRecord){
        return res.status(400).json({
            message : "Invalid OTP."
        });
    }

    const user = await userModel.findByIdAndUpdate(otpRecord.user, { verified: true });

    if(!user){
        return res.status(404).json({
            message : "User not found."
        });
    }

    await otpModel.deleteMany({
        email
    }); 

    res.status(200).json({
        message : "Email verified successfully.",
        user : {
            username : user.username,
            email : user.email,
            verified : true
        }
    });
}
