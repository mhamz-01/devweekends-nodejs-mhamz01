const mongoose = require('mongoose')
const { Schema } = mongoose
const { createHmac, randomBytes } = require('node:crypto')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'default-profile.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

userSchema.pre("save", function () {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
})

userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;

    const hashedPassword = createHmac("sha256", user.salt).update(password).digest("hex");
    if (hashedPassword !== user.password) return null;

    return user;
})

const User = mongoose.model('user', userSchema)

module.exports = User
