const { Router } = require('express')

const courseService = require('../../services/course')
const { isAuthenticated } = require('../middlewares')

const route = Router()

module.exports = (app) => {

    app.use('/courses', route)

    route.get('', isAuthenticated, async(req, res) => {

        const allCourses = await courseService.allCourses()

        return res.status(200).json({
            data: allCourses
        })
    })
    
    route.get('/:id', isAuthenticated, async(req, res) => {
        
        const course = await courseService.getCourseById(req.params.id)

        if (course == null) return res.json({}).status(404)

        return res.status(200).json({
            data: course
        })
    })

    route.post('', isAuthenticated, async(req, res) => {

        const newCourse = await courseService.addCourse(req.body)

        if (newCourse == null) return res.json({}).status(400)

        return res.status(200).json({
            data: newCourse.insertedId
        })
    })

    route.delete('/:id', isAuthenticated, async(req, res) => {

        const courseStudent = await courseService.deleteCourseById(req.params.id)

        if (courseStudent == null) return res.json({}).status(400)

        return res.status(200).json({
            data: courseStudent
        })
    })
}
