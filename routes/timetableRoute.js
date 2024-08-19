const express= require('express')
const router= express.Router()
const timetableController= require('../controllers/timetableController')

router.get('/timetables',timetableController.getAllTimetables)
router.post('/timetables', timetableController.createTimeTable)
router.get('/timetables/:id', timetableController.getTimeTableById)

module.exports = router