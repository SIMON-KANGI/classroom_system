const Timetable = require('../models/Timetable');
const Classroom = require('../models/ClassRoom');

// Get all timetables
exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find().populate('classroom'); // Populating referenced documents
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new timetable
exports.createTimeTable = async (req, res) => {
    const { classroomName, schedule, teacher } = req.body;
    try {
        // Find the classroom by name
        const classroom = await Classroom.findOne({ name: classroomName });
        if (!classroom) {
            return res.status(400).json({ message: 'Classroom not found. Create a classroom first.' });
        }

        // Create a new timetable
        const newTimetable = new Timetable({
            classroom: classroom._id,
            schedule,
            teacher,
        });

        //save
        await newTimetable.save();
        res.status(201).json(newTimetable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a timetable by ID
exports.getTimeTableById = async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id).populate('classroom teacher');
        if (!timetable) {
            return res.status(404).json({ message: 'Cannot find timetable' });
        }
        res.json(timetable);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a timetable by ID
exports.deleteTimeTable = async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!timetable) {
            return res.status(404).json({ message: 'Cannot find timetable' });
        }
        res.json({ message: 'Timetable deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
