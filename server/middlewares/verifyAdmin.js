import AuthModel from "../models/Auth.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await AuthModel.findById(id);
        if (!user.isAdmin) {
            res.status(401).json({ message: "Action not permitted!" });
            return;
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};

export default verifyAdmin;