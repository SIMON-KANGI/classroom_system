const Classroom = require('../models/ClassRoom');



exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Classroom.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClass = async (req, res) => {
  const classroom= new Classroom(req.body);
  try {
    const newClassroom = await classroom.save();
    res.status(201).json(newClassroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (classroom == null) {
      return res.status(404).json({ message: 'Cannot find Classroom' });
    }
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (classroom == null) {
      return res.status(404).json({ message: 'Cannot find class' });
    }
    Object.assign(classroom, req.body);
    await classroom.save();
    res.json(classroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (classroom == null) {
      return res.status(404).json({ message: 'Cannot find class' });
    }
    await classroom.remove();
    res.json({ message: 'Classroom deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
