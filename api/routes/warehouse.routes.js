module.exports = (app) => {
    const warehouse = require('../controllers/warehouse.controller')

    app.post('/api/warehouse', warehouse.create)
    app.get('/api/warehouse', warehouse.findAll)
    app.get('/api/warehouse/:warehouseId', warehouse.findOne)
    app.put('/api/warehouse/:warehouseId', warehouse.update)
    app.delete('/api/warehouse/:warehouseId', warehouse.delete)
}