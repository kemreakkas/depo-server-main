const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema([{
    companyName: String,
    companyPhone: String,
    companyOwner: String,
    companyContact: String,
    companyContactPhone: String,
    location: String,
    companyDescription: String,
}], {
    timestamps: true
})

module.exports = mongoose.model('company', CompanySchema, 'company')