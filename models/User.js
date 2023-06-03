import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    passwordHash: {
        type: String,
        required: true,
    },
    canTrain: [String],
    language: String,
    avatarUrl: String,
    weight: Number,
    measure: String,
    // Theme: {}
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);
