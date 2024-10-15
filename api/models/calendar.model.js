const mongoose = require('mongoose')

const CalendarSchema = mongoose.Schema([{
    date: Date,
    title: String,
}], {
    timestamps: true
})

module.exports = mongoose.model('calendar', CalendarSchema, 'calendar')