import mongoose, { Schema } from "mongoose";

const ExSetSchema = new Schema({
    load: Number,
    // ???
    // measure: String,
    result: Number,
    additional: String,
});

const ExSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sets: {
        type: [ExSetSchema],
        required: true,
    },
});

const WorkoutDaySchema = new Schema({
    date: {
        // TODO: replace with a Date type
        type: String,
        required: true,
    },
    exercises: {
        type: [ExSchema],
        required: true,
    },
    workoutDuration: Number,
}, {
    timestamps: true,
});

const WorkoutUserDays = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    days: {
        type: [WorkoutDaySchema],
        required: true,
    },
});

export default mongoose.model('Workout', WorkoutUserDays);
