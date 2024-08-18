const Timetable= require('../models/Timetable')
const Classroom= require('../models/Classroom')
exports.getAllTimetables=async(req,res)=>{
    try{
        const timetables= await Timetable.find()
        res.json(timetables)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.createTimeTable= async(req,res)=>{
    const timetable= new Timetable({classroomName, schedule})

    try{
        const classroom = await Classroom.findOne({ name: classroomName });
        if(!classroom) return "Create a classroom first"
        const newTimetable= new Timetable({
            classroom:classroom._id,
            schedule
        })
        newTimetable.save()
        res.status(201).json(newTimetable)
    }catch(err){
        res.status(400).json({message:err.message})
    }
}
exports.getTimeTableById= async(req,res)=>{
    try{
        const timetable= await Timetable.findById(req.params.id)
        if(!timetable){
            return res.status(404).json({message:'Cannot find timetable'})
        }
        res.json(timetable)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}