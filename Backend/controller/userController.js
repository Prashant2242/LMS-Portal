import User from "../model/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";


export const getCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);
  
    } catch (error) {
      return res.status(500).json({
        message: `GetCurrentUser error: ${error.message}`
      });
    }
  };
  

export const updateProfile = async (req, res) => {
    try{
        const userId = req.userId
        const {description, name} = req.body
        
        // Build update object, only including fields that are provided
        const updateData = {}
        if(name) updateData.name = name
        if(description !== undefined) updateData.description = description
        
        if(req.file){
            const uploadedUrl = await uploadOnCloudinary(req.file.path)
            if(uploadedUrl){
                updateData.photoUrl = uploadedUrl
            } else {
                return res.status(500).json({message:"Failed to upload image to Cloudinary"})
            }
        }
        
        // Find user first to check if exists
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        
        // Update user with new data
        Object.assign(user, updateData)
        await user.save()
        
        // Return updated user without password
        const updatedUser = await User.findById(userId).select("-password")
        return res.status(200).json(updatedUser)
        
    }catch (error){
        return res.status(500).json({message:`updateProfile error ${error.message}`})
    }
} 