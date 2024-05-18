import Notification from "../models/notification.model.js";


export const getNotifications = async(req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({to: userId}).populate({
            path: "from",
            select: "username profileImg"
        });

        await Notification.updateMany({to: userId}, {read: true});

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({error: "Error in getNotifications controller"})
    }
}


export const deleteNotifications = async(req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({from: userId});
        
        res.status(200).json({message: "Notifications deleted successfully"})
    } catch (error) {
        res.status(500).json({error: "Error in deleteNotifications controller"});
    }
}