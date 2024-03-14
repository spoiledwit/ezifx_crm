import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    kycStatus:{
        type: String,
        default: "pending"
    },
    image:{
        type: String,
        required: true
    },
    identityType:{
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Kyc = mongoose.model("Kyc", kycSchema);
export default Kyc;