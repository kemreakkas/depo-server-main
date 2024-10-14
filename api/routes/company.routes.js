module.exports = (app) => {
    const company = require('../controllers/company.controller')

    app.post('/api/company', company.create)
    app.get('/api/company', company.findAll)
    app.get('/api/company/:companyId', company.findOne)
    app.put('/api/company/:companyId', company.update)
    app.delete('/api/company/:companyId', company.delete)
}