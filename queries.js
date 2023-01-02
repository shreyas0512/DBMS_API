const Pool = require('pg').Pool
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: DB_URL,
    ssl: process.env.DATABASE_URL ? true : false
})



const getInmates = (request, response) => {
    pool.query('SELECT * FROM admissions ORDER BY admn_no ASC', (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const getInmateById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM admissions WHERE admn_no = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const createInmate = (request, response) => {
    const { admn_no , name , year , branch , category , date_of_admn , room_no } = request.body

    pool.query('INSERT INTO admissions (admn_no , name , year , branch , category , date_of_admn , room_no) VALUES ($1, $2, $3, $4, $5, $6, $7)', [admn_no , name , year , branch , category , date_of_admn , room_no], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`Inmate added with ADMN_NO: ${results.admn_no}`)
    })
}

//Complaints

const getComplaints = (request, response) => {
    pool.query('SELECT * FROM complaints ORDER BY room_no ASC', (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const getComplaintById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM complaints WHERE room_no = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const createComplaint = (request, response) => {
    const { admission_no , room_no , complaint } = request.body

    pool.query('INSERT INTO complaints (admission_no , room_no , complaint) VALUES ($1, $2, $3)', [admission_no , room_no , complaint], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`Complaint added by : ${results.admission_no}`)
    })
}

//Stocks


const getStockDetails = (request, response) => {
    pool.query('SELECT * FROM stock', (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const getStockByMonth = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM stock WHERE month = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const createStockEntry = (request, response) => {
    const { month , item , quantity } = request.body

    pool.query('INSERT INTO stock (month , item , quantity) VALUES ($1, $2, $3)', [month , item , quantity], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(201).send(`STOCK IN`)
    })
}


const getAttendance = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM mess_bill WHERE admission_no = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const getVacancies = (request, response) => {
  pool.query('SELECT * FROM rooms WHERE vacancies>0', (error, results) => {
        if (error) {
            return response.status(400).json({
                success: false,
                error: error.name,
                message: error.message
            })
        }
        response.status(200).json(results.rows)
    })
}

const updateVac = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'UPDATE rooms SET vacancies = vacancies-1 WHERE room_no = $1',
        [id],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    success: false,
                    error: error.name,
                    message: error.message
                })
            }
            response.status(200).send(`User modified with ID: ${room_no}`)
        }
    )
}




module.exports = {
    getInmates,getAttendance,getVacancies,getComplaintById,getComplaints,getInmateById,createInmate,createComplaint,getStockDetails,getStockByMonth,createStockEntry,updateVac
}