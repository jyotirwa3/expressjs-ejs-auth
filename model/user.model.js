const { Schema, model } = require("mongoose");
const common = {
    type: String,
    required: true,
    trim: true
}

const userSchema = new Schema({
    user_name: { ...common },
    user_email: {
        ...common,
        unique: [true, "Email id already exist"],
    },
    user_password: {
        ...common
    },
    user_mobile: {
        ...common
    },
    user_profile: {
        ...common,
        required: false
    },
    user_role_id: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3]
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User;