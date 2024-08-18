const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const {isEmail} = require('validator')
const Classroom= require('./ClassRoom')
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please provide a valid email address']  // Validate email format
    },
    role: {
        type: String,

        enum: ['Principal', 'Teacher', 'Student']  // Define allowed roles
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
  
    classrooms:[{
        type: Schema.Types.ObjectId,
        ref: 'Classroom',  // Reference to the Classroom model
    }],
    date: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt= await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare hashed password with the provided password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Automatically set role based on email pattern
userSchema.methods.setRole = function () {
    if (this.email === 'principal@classroom.com') {
        this.role = 'Principal';
    } else if (this.email.endsWith('@teacher.com')) {
        this.role = 'Teacher';
    } else if (this.email.endsWith('@student.com')) {
        this.role = 'Student';
    } else {
        throw new Error('Invalid email for role assignment');
    }
};


module.exports = mongoose.model('User', userSchema);
