const courseModel = require('../models/course')

module.exports = {
    allCourses: () => courseModel.find(),
    addCourse: (data) => courseModel.create(data),
    getCourseById: (id) => courseModel.findById(id),
    deleteCourseById: (id) => courseModel.deleteOne({ _id: id })
}
