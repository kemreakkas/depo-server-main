const express = require('express')
const bodyParser = require('body-parser')
const dbConf = require('./config/db.config')
const mongoose = require('mongoose')
const cors = require('cors')
const router = express.Router();

if (!dbConf.uri) {
    throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise;

mongoose.connect(dbConf.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Veritabanına bağlantı başarılı`)
}).catch(err => {
    console.log(`Veritabanına bağlanamadınız ${err}`)
    process.exit()
})

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

// basit bir rota tanımlayalım
app.get('/api', (req, res) => {
    res.json(
        {
            "company": {
                "get": "/api/company",
                "get companyId": "/api/company/:companyId",
                "delete companyId": "/api/company/:companyId",
                "post": "/api/company",
                "update": "/api/company/:companyId",
            },
            "sales": {
                "get": "api/sales",
                "get salesId": "/api/sales/:salesId",
                "delete salesId": "/api/sales/:salesId",
                "post": "/api/sales",
                "update": "/api/sales/:salesId",
            },
            "warehouse": {
                "get": "api/warehouse",
                "get warehouseId": "/api/warehouse/:warehouseId",
                "delete warehouseId": "/api/warehouse/:warehouseId",
                "post": "/api/warehouse",
                "update": "/api/warehouse/:warehouseId",
            }
        },
    );
})

require('./routes/company.routes')(app)
require('./routes/warehouse.routes')(app)
require('./routes/sales.routes')(app)
// listen for requests
app.listen( 3001, () => {
    console.log("Sunucu 3000 portunda hizmet vermekte.");
})