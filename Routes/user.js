import express from 'express';
import ResFunc from '../ResFunc/ResFunc.js';
import 'dotenv/config'
const userRouter = express.Router()
import authentication from '../middleware/authentication.js';
import User from '../Models/User.js';

userRouter.put("/", authentication, async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body;

        const updateUserData = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        )

        if (!updateUserData) return ResFunc(res, 404, true, null, "User Not Found!")
        ResFunc(res, 200, false, updateUserData, "User Update Successfully!")

    } catch (error) {
        console.log("Update Error" + error)
        ResFunc(res, 500, true, null, "Error in Updating User")
    }
})


userRouter.delete("/", authentication, async (req, res) => {
    try {
        const userId = req.user._id;

        const deleteUSer = await User.findByIdAndDelete(
            userId,
        )

        if (!deleteUSer) return ResFunc(res, 404, true, null, "User Not Deleted!")
        ResFunc(res, 200, false, null, "User Deleted Successfully!")

    } catch (error) {
        console.log("Update Error" + error)
        ResFunc(res, 500, true, null, "Error in Deleting User")
    }
})

export default userRouter;