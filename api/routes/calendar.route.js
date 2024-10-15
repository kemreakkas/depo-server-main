module.exports = (app) => {
    const calendar = require('../controllers/calendar.controller')

    app.post('/api/calendar', calendar.create)
    app.get('/api/calendar', calendar.findAll)
    app.get('/api/calendar/:title', calendar.findOne)
    app.put('/api/calendar/:title', calendar.update)
    app.delete('/api/calendar/:title', calendar.delete)
}