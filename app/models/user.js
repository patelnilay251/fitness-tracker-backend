import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    age: Number,
    height: Number,
    weight: Number,
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    activityLevel: {
        type: String,
        enum: ["sedentary", "lightly_active", "moderately_active", "very_active", "extra_active"]
    },
    goal: {
        type: String,
        enum: ["lose_weight", "maintain_weight", "gain_weight"]
    },
    targetCalories: {
        type: Number,   
    }

});

const User = mongoose.model('user', userSchema);

export default User;