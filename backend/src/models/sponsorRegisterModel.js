import mongoose from "mongoose";

const sponsorRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    amount: {
      type: String
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const SponsorModel = new mongoose.model('Sponsor', sponsorRegisterSchema);
export default SponsorModel;