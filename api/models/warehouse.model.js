const mongoose = require('mongoose')

const WarehouseSchema = mongoose.Schema([{
    stockNumber: String,
    productName: String,
    warehouse: String,
    companyDescription: String,
    stock: String,
    purchasePrice: String,
    salePrice: String,
}], {
    timestamps: true
})

module.exports = mongoose.model('warehouse', WarehouseSchema, 'warehouse')