import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res,next) =>{
    // get user details from frontend
    // validation - not empty 
    // check if user alredy exists - email, username
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create empty in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { fullname, username, email, password } = req.body
    console.log("email:", email);

    // if(fullName === ""){
    //     throw new ApiError(400, "Full name is required")
    // }

    if(
        [fullname, username, email, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [ {username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with this email or username already exists")
    }

    // console.log("req.files:", req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    if(!coverImageLocalPath){
        throw new ApiError(400, "Cover image file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath) 

    if( !avatar  || !coverImage ){
                throw new ApiError(500, "Error uploading files to cloudinary")
 }

 const user = await User.create({
    fullname,
    username : username.toLowerCase(),
    email,  
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || " "

 })

 const createdUser = await User.findById(user._id).select(
    " -password  -refreshToken "
 )

 if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
 }

 return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
 )

})

export { registerUser }