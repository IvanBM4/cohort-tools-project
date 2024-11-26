const mongosee = require('mongoose')

const studentSchema = mongosee.Schema({


    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: Array,
    program: String,
    background: String,
    image: String,
    cohort: mongosee.Schema.Types.ObjectId,
    projects: Array

})

const Student = mongosee.model('student', studentSchema)

module.exports = Student