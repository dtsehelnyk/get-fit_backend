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
    canTrain: {
        type: Array,
        default: [],
    },
    language: {
        type: String,
        default: 'eng'
    },
    avatarUrl: String,
    weight: Number,
    measure: {
        type: String,
        default: 'kg',
    },
    // workouts: {
    //     type: [WorkoutDaySchema],
    //     required: true,
    //     default: [],
    // }
    // Theme: {}
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);
