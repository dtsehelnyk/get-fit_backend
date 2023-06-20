import mongoose, { Schema } from "mongoose";

// ???
const CommonExSet = new Schema({
    reps: Number,
    duration: Date,
    payload: Number,
    additional: String,
});

const CommonExTemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    // sets: [CommonExSet],
    type: {
        type: String,
        required: true,
    },
    tags: [String],
    previewImg: String,
    description: String,
});

export default mongoose.model('CommonExercise', CommonExTemplateSchema);
