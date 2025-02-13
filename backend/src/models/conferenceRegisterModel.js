import mongoose from 'mongoose';

const registerUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registrationType: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    earlyBird: {
        type: Boolean,
        default: false
    },
    regFee: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const RegisterUserModel = mongoose.model('RegisteredUser', registerUserSchema);

export default RegisterUserModel;