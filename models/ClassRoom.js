const mongoose= require('mongoose');
const Schema=  mongoose.Schema

const ClassRoomSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User',  // References to the Student model
    }],
    teacher:{
        type: Schema.Types.ObjectId,
        ref: 'User',  // References to the Teacher model
    },
    schedule: [{
        day: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        }
      }]
})

module.exports= mongoose.model('ClassRoom', ClassRoomSchema)