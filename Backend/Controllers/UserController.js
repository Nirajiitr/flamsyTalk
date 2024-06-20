import { User } from "../Models/UserModel.js";
import bcrypt from "bcryptjs";



export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      const { Password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json(" no such user exits");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res ) =>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus, Password}= req.body;
   
    if(id=== currentUserId || currentUserAdminStatus){
  try {

    if(Password){
        const salt = await bcrypt.genSalt(10);
        req.body.Password = await bcrypt.hash(Password, salt);
    }
    const user = await User.findByIdAndUpdate(id, req.body, {new:true});
       
      res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json(error);
  
      }
    }
    else{
        res.status(403).json("Access Denied! you can only update your own Profile")
    }
}

export const deleteUser = async(req, res)=>{
  const id = req.params.id;
  const {currentUserId, currentUserAdminStatus}= req.body;
  if(id===currentUserId || currentUserAdminStatus){
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json("user deleted successfully")
    } catch (error) {
        res.status(500).json(error);
    }
  }
  else{
    res.status(403).json("Access Denied! you can only delete your own Profile")
  }
}
export const FollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, ProfilePhoto, FullName } = req.body;

  if (!currentUserId || id === currentUserId) {
    return res.status(403).json("Action forbidden");
  }

  try {
    const followUser = await User.findById(id);
    const followingUser = await User.findById(currentUserId);

    if (!followUser.followers.some(follower => follower.UserId === currentUserId)) {
      await followUser.updateOne({ $push: { followers: { UserId: currentUserId, ProfilePhoto, FullName } } });
      await followingUser.updateOne({ $push: { following: { UserId: id, ProfilePhoto: followUser.ProfilePhoto, FullName: followUser.FullName } } });
      res.status(200).json("User followed!");
    } else {
      res.status(403).json("Already followed");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const UnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;

  if (!currentUserId || id === currentUserId) {
    return res.status(403).json("Action forbidden");
  }

  try {
    const userToUnfollow = await User.findById(id);
    const userWantUnfollow = await User.findById(currentUserId);

    if (userToUnfollow.followers.some(follower => follower.UserId === currentUserId)) {
      await userToUnfollow.updateOne({ $pull: { followers: { UserId: currentUserId } } });
      await userWantUnfollow.updateOne({ $pull: { following: { UserId: id } } });
      res.status(200).json("User unfollowed!");
    } else {
      res.status(403).json("You don't follow this user yet");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
