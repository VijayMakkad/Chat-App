import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - No User Logged In" });
        }

        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // console.log(loggedInUserId,users)
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Users not available" });
        }

        res.status(200).json(users);

    } catch (error) {
        console.log("Error in getUsers controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId} =req.params
        const senderId=req.user._id
        
        const messages=await Message.find({
            $or:[
                {senderId:senderId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:senderId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body
        const {id:reciverId}=req.params
        const senderId=req.user._id

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageUrl=uploadResponse.secure_url 
        }

        const newMessage=new Message({
            senderId,
            reciverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        //realtime functionality with socket.io
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

