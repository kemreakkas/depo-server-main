const company = require("../controllers/sales.controller");
module.exports = (app) => {
    const sales = require('../controllers/sales.controller')

    app.post('/api/sales', sales.create)
    app.get('/api/sales', sales.findAll)
    app.get('/api/sales/:salesId', sales.findOne)
    app.put('/api/sales/:salesId', sales.update)
    app.delete('/api/sales/:salesId', sales.delete)
}