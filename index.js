const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')
const app = express()

require('dotenv').config();
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json(
      {
        "message": "Welcome to the Hostel Management System API",
        "routes": [
          {
            "route": "/inmates",
            "methods": [
              "GET",
              "POST"
            ]
          },
          {
            "route": "/inmates/:id",
            "methods": [
              "GET"
             
            ]
          },
          {
            "route": "/stock",
            "methods": [
              "GET",
              "POST"
            ]
          },
          {
            "route": "/stock/:id",
            "methods": [
              "GET"
             
            ]
          },
          {
            "route": "/complaints",
            "methods": [
              "GET","POST"
            ]
          },
          {
            "route": "/complaints/:id",
            "methods": [
              "GET"
             
            ]
          },
          
          {
            "route": "/attendance/:id",
            "methods": [
              "GET"
              
            ]
          },
          {
            "route": "/vacantrooms",
            "methods": [
              "GET"
              
            ]
          },
          
        ]
      }
    )
  })

app.get('/inmates',db.getInmates)
app.get('/inmates/:id',db.getInmateById)
app.post('/inmates',db.createInmate)
app.post('/inmates', db.createInmate)
app.get('/complaints', db.getComplaints)
app.get('/complaints/:id', db.getComplaintById)
app.post('/complaints', db.createComplaint)
app.get('/stock', db.getStockDetails)
app.get('/stock/:id',db.getStockByMonth)
app.post('/stock',db.createStockEntry)
app.get('/attendance/:id',db.getAttendance)
app.get('/vacantrooms',db.getVacancies)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })


  module.exports=app;






