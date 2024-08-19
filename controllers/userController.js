const Classroom = require('../models/ClassRoom'); 
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('classrooms');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password, role, classroomName } = req.body;

  try {
    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //create a principal before validating the classroom
    if (email === 'principal@classroom.com') {
      // Create a principal without a classroom
      const newUser = new User({
        name,
        email,
        password,
        role,
      });

      // Save the new principal
      await newUser.save();
      return res.status(201).json(newUser);
    }
//the classroom is needed from teacher and student roles
    if (!classroomName) {
      return res.status(400).json({ message: 'Classroom is required for this role' });
    }

    // Find the classroom by name
    const classroom = await Classroom.findOne({ name: classroomName });
    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }

    // Create a new user with the classroom assignment
    const newUser = new User({
      name,
      email,
      password,
      role,
      classrooms: [classroom._id], // Save the classroom's ObjectId in the array
    });

    // Save the new user
    await newUser.save();
    res.status(201).json(newUser);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('classroom'); // Populate classroom details if needed
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only update allowed fields
    const allowedUpdates = ['name', 'email', 'role', 'password', 'classroom']; // 'classroom' added
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
