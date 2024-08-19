const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassRoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  schedule: [{
    day: {
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
    },
   
  }],
  
});

module.exports = mongoose.model('ClassRoom', ClassRoomSchema);
