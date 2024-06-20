import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'; // Changed import from bccryptjs to bcryptjs

export const test = (req, res) => {
    res.json({
        message: 'api route is working',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can update your own account'));

    try {
        if (req.body.password) { // Changed req.password to req.body.password
            req.body.password = await bcryptjs.hash(req.body.password, 10); // Changed req.password to req.body.password
        }
        
        const updateData = { // New code to construct the updateData object
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
        };

        if (req.body.password) { // Conditionally add password to updateData
            updateData.password = req.body.password;
        }

        const updatedUser = await User.findByIdAndUpdate( // Changed from findById to findByIdAndUpdate
            req.params.id,
            { $set: updateData }, // Use $set operator
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// import User from "../models/user.model.js";
// import { errorHandler } from "../utils/error.js";

// import bcryptjs from 'bcryptjs'

// export const test =(req,res)=>{
//     res.json({
//         message:'api route is working',
//     });
// }

// export const updateUser = async(req,res,next) => {
//     if(req.user.id !== req.params.id) return next(errorHandler(401,'You can update your own account'))

//         try {
//             if(req.body.password){
//             req.body.password = await bcryptjs.hashSync(req.body.password,10)
//             }
//             const updateUser =  await User.findById(req.params.id,{
//                 $set:{
//                     username:req.body.username,
//                     email:req.body.email,
//                     password:req.body.password,
//                     avatar:req.body.avatar,
//                 }
//             },{new:true})
//             const {password, ...rest} = updateUser._doc
//             res.status(200).json(rest);
//         } catch (error) {
//             next(error);
//         }
// }