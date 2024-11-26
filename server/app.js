const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const Cohort = require('./models/cohort.model/cohort.model')
const Student = require('./models/student.model/student.model')
const { model } = require('mongoose')
const PORT = 5005

const app = express()

app.use(logger('dev'))
app.use(express.json())
require('./db')
app.use(cors({
  origin: ['http://localhost:5173']
}))


app.get('/api/cohorts', (req, res) => {

  Cohort
    .find()
    .then(cohorts => res.json(cohorts))
    .catch(err => console.log(err))
})


app.get('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId: _id } = req.params

  Cohort
    .findById(_id)
    .then(cohort => res.json(cohort))
    .catch(err => console.log(err))
})


app.get('/api/students', (req, res) => {

  Student
    .find()
    .then(students => res.json(students))
    .catch(err => console.log(err))
})


app.get('/api/students/:studentId', (req, res) => {

  const { studentId: _id } = req.params

  Student
    .findById(_id)
    .then(student => res.json(student))
    .catch(err => console.log(err))
})


app.get('/api/students/cohort/:cohortId', (req, res) => {

  const { cohortId: cohort } = req.params

  Student
    .find({ cohort })
    .then(students => res.json(students))
    .catch(err => console.log(err))
})


app.post('/api/cohorts', (req, res) => {
  Cohort
    .create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    })
    .then(createdCohort => res.json(createdCohort))
    .catch(err => console.log('te dio error aqui manin', err))

})

app.post('/api/students', (req, res) => {
  Student
    .create({

      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      languages: [],
      linkedinUrl: req.body.linkedinUrl,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: []

    })
    .then(createdStudent => console.log('el student creado es', res.json(createdStudent)))
    .catch(err => console.log('te dio error aqui manin', err))

})

app.delete('/api/students/:studentId', (req, res) => {
  const { studentId: _id } = req.params
  Student
    .findByIdAndDelete(_id)
    .then(removeStudent => console.log('hemos borrao ', res.json(removeStudent)))
    .catch(err => console.log('fallo mani', err))

})

app.delete('/api/cohorts/:cohortId', (req, res) => {
  const { cohortId: _id } = req.params
  Cohort
    .findByIdAndDelete(_id)
    .then(removeCohort => console.log('hemos borrao ', res.json(removeCohort)))
    .catch(err => console.log('fallo mani', err))

})

app.put('/api/students/:studentId', (req, res) => {

  const { studentId: _id } = req.params



  Student
    .findByIdAndUpdate(_id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      languages: [],
      linkedinUrl: req.body.linkedinUrl,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: []

    }, { new: true })
    .then(upadteStudent => res.json(upadteStudent))
    .catch(err => console.log('esto es un coso raro', err))
})

app.put('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId: _id } = req.params

  Cohort
    .findByIdAndUpdate(_id, {
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    }
      , { new: true })
    .then(upadteCohort => res.json(upadteCohort))
    .catch(err => console.log('esto es un coso raro', err))
})


app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => console.log(`Server running on portn ${PORT}`))